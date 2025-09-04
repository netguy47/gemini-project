import numpy as np
from sklearn.neural_network import MLPRegressor
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from statsmodels.tsa.arima.model import ARIMA

class PredictiveEngine:
    """Combined predictive engine integrating multiple modelling techniques."""

    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.svd = TruncatedSVD(n_components=2)
        self.arima_model = None
        self.transition = None
        self.nn = None
        self.ensemble = None
        self.residual_std = 1.0
        self.data = None

    def _build_markov(self, series):
        bins = np.quantile(series, [0.25, 0.5, 0.75])
        states = np.digitize(series, bins)
        transition = np.zeros((4, 4))
        for i, j in zip(states[:-1], states[1:]):
            transition[i, j] += 1
        transition = np.divide(transition, transition.sum(axis=1, keepdims=True),
                               out=np.zeros_like(transition), where=transition.sum(axis=1, keepdims=True)!=0)
        return states, transition

    def fit(self, series, query=""):
        """Fit all models on historical series and optional query text."""
        self.data = np.asarray(series)
        if query:
            vec = self.vectorizer.fit_transform([query])
            self.context = self.svd.fit_transform(vec)[0]
        else:
            self.context = np.zeros(2)

        # ARIMA baseline
        self.arima_model = ARIMA(self.data, order=(2, 1, 2)).fit()
        arima_pred = self.arima_model.fittedvalues

        # Markov chain
        states, self.transition = self._build_markov(self.data)
        markov_pred = []
        last_state = states[0]
        for _ in range(len(self.data)):
            next_state = np.argmax(self.transition[last_state])
            state_values = self.data[states == next_state]
            markov_value = state_values.mean() if len(state_values) else self.data.mean()
            markov_pred.append(markov_value)
            last_state = next_state
        markov_pred = np.array(markov_pred)

        # Neural net on residuals
        residuals = self.data - arima_pred
        X_resid = np.arange(len(residuals)).reshape(-1, 1)
        self.nn = MLPRegressor(hidden_layer_sizes=(10,), max_iter=500, random_state=42)
        self.nn.fit(X_resid, residuals)
        nn_pred = arima_pred + self.nn.predict(X_resid)

        # Ensemble fusion
        features = np.vstack([arima_pred, markov_pred, nn_pred]).T
        self.ensemble = GradientBoostingRegressor(random_state=42)
        self.ensemble.fit(features, self.data)

        # Bayesian residual variance
        train_residuals = self.data - self.ensemble.predict(features)
        self.residual_std = np.std(train_residuals) if np.std(train_residuals) > 0 else 1.0

    def _markov_forecast(self, steps, last_state, series):
        preds = []
        for _ in range(steps):
            next_state = np.argmax(self.transition[last_state])
            state_values = series[series == series]  # all values
            preds.append(state_values.mean())
            last_state = next_state
        return np.array(preds)

    def predict(self, steps, query=""):
        """Generate forecasts and uncertainty samples."""
        if query:
            vec = self.vectorizer.transform([query])
            context = self.svd.transform(vec)[0]
        else:
            context = self.context

        arima_forecast = self.arima_model.forecast(steps=steps)
        states, _ = self._build_markov(self.data)
        markov_forecast = self._markov_forecast(steps, states[-1], self.data)
        future_idx = np.arange(len(self.data), len(self.data) + steps).reshape(-1, 1)
        nn_forecast = arima_forecast + self.nn.predict(future_idx)

        features = np.vstack([arima_forecast, markov_forecast, nn_forecast]).T
        forecast = self.ensemble.predict(features)

        # Monte Carlo sampling assuming normal residuals
        samples = np.random.normal(loc=forecast, scale=self.residual_std, size=(1000, steps))
        return forecast, samples

    def generate_report(self, query, forecast, samples):
        mean = forecast[0]
        lower, upper = np.percentile(samples[:, 0], [2.5, 97.5])
        return (
            f"Query: {query}\n"
            f"Forecast next value: {mean:.2f}\n"
            f"95% confidence interval: [{lower:.2f}, {upper:.2f}]\n"
        )


def demo():
    # synthetic data
    np.random.seed(42)
    time = np.arange(120)
    trend = 0.1 * time
    seasonal = np.sin(2 * np.pi * time / 12)
    noise = np.random.normal(scale=0.5, size=120)
    data = trend + seasonal + noise

    query = input("Enter your query: ")
    engine = PredictiveEngine()
    engine.fit(data[:100], query)
    forecast, samples = engine.predict(12, query)
    report = engine.generate_report(query, forecast, samples)
    print(report)

if __name__ == "__main__":
    demo()
