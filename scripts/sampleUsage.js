const { generateWorldview } = require('../lib/whatIfEquation');

const sampleInput = {
  S: 'Egalitarian nomadism',
  E: 'Oceanic archipelago',
  T: 'AI-augmented biotech',
  G: 'Algorithmic direct democracy',
  C: 'Oral epic preservation',
  I: 'Clan-based loyalty',
  P: 'Overcrowded arcologies',
  K: 'Simulated learning loops',
  R: 'Solar superstorms',
  D: 'Communal labor rites'
};

const result = generateWorldview(sampleInput);
console.log(JSON.stringify(result, null, 2));
