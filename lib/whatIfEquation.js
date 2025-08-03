const FACTORS = ['S','E','T','G','C','I','P','K','R','D'];

const FACTOR_OPTIONS = {
  S: ['Guild hierarchy', 'Egalitarian nomadism', 'Caste system'],
  E: ['Oceanic archipelago', 'Arid desert', 'Flooded megacities'],
  T: ['Bronze age', 'AI-augmented biotech', 'Post-quantum mesh'],
  G: ['Dynastic rule', 'Algorithmic direct democracy', 'Anarcho-syndicalism'],
  C: ['Oral epic preservation', 'Shame-based ethics', 'Neo-totemic symbolism'],
  I: ['Clan-based loyalty', 'Empathic pairing', 'State-assigned kinships'],
  P: ['Shrinking rural cores', 'Overcrowded arcologies', 'Immortal elite caste'],
  K: ['Dreamtime epistemology', 'Guild-sealed knowledge', 'Simulated learning loops'],
  R: ['Solar superstorms', 'Quantum plagues', 'Chrono-anomalies'],
  D: ['Communal labor rites', 'Subterranean daylight inversion', 'Intermittent identity roles']
};

function generateWorldview(input) {
  return FACTORS.map(key => {
    const options = FACTOR_OPTIONS[key];
    const value = options.includes(input[key]) ? input[key] : options[0];
    return {
      factor: key,
      choice: value,
      isolatedImpact: `Baseline shift: ${value}`,
      combinedEffects: `Interplays with other factors to produce emergent narratives.`
    };
  });
}

module.exports = { generateWorldview, FACTOR_OPTIONS };
