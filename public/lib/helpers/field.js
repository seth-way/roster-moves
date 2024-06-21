export const getUnitSize = width => {
  if (width >= 600) return 10;
  if (width >= 450) return 7.5;
  return 5;
};
