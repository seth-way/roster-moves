var r = document.querySelector(':root');

export const getCssVariableValue = variableName =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

export const setCSSVariable = (attr, value) => {
  r.style.setProperty(attr, value);
};

export const getRandomElement = array =>
  array[Math.floor(Math.random() * array.length)];
