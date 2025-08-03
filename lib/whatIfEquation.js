const FACTORS = ['S','E','T','G','C','I','P','K','R','D'];

function generateWorldview(input) {
  return FACTORS.map(key => {
    const value = input[key] || 'unspecified';
    return {
      factor: key,
      isolatedImpact: `Baseline shift: ${value}`,
      combinedEffects: `Interplays with other factors to produce emergent narratives.`
    };
  });
}

module.exports = { generateWorldview };
