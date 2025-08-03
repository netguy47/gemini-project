const { generateWorldview, FACTOR_OPTIONS } = require('../lib/whatIfEquation');

const sampleInput = {
  S: FACTOR_OPTIONS.S[1],
  E: FACTOR_OPTIONS.E[0],
  T: FACTOR_OPTIONS.T[1],
  G: FACTOR_OPTIONS.G[1],
  C: FACTOR_OPTIONS.C[0],
  I: FACTOR_OPTIONS.I[0],
  P: FACTOR_OPTIONS.P[1],
  K: FACTOR_OPTIONS.K[2],
  R: FACTOR_OPTIONS.R[0],
  D: FACTOR_OPTIONS.D[0]
};

const result = generateWorldview(sampleInput);
console.log(JSON.stringify(result, null, 2));
