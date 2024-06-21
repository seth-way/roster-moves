export const getCssVariableValue = variableName =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
