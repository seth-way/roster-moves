export const getCssVariableValue = variableName =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

export const getRandomElement = array =>
  array[Math.floor(Math.random() * array.length)];
