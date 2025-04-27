// File: pages/index.js

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResult(data.summary);
    } catch (error) {
      setResult('Error fetching summary.');
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to EconHub</h1>
      <p>Search research topics and get instant AI summaries.</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your research topic..."
        style={{ padding: '0.5rem', width: '300px', marginRight: '0.5rem' }}
      />
      <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      <div style={{ marginTop: '2rem' }}>
        {result && (
          <div>
            <h2>Summary:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
