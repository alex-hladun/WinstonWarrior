export const handicapDiffCalc = (score, rtg, slope) => {
  return ((score - rtg) * 113 / slope)
}