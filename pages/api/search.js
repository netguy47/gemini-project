// File: pages/api/search.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    // Simulate a GPT-like response (later, we'll connect to real OpenAI API)
    const fakeResponse = {
      summary: `This is a simulated summary for your search query: "${query}". Real GPT connection coming soon!`
    };

    res.status(200).json(fakeResponse);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}