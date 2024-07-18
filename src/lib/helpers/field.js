import { getDistance } from './player.js';

export const getUnitSize = width => {
  if (width >= 600) return 10;
  if (width >= 450) return 7.5;
  return 5;
};

const getShuffledArray = () => {
  return [-1, 0, 1]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const isInBounds = (x, y, deltaX, deltaY, unit) => {
  let minX = 50 * unit;
  let maxX = 58 * unit;
  let minY = 0;
  let maxY = 58 * unit;

  if (x < 50 * unit) {
    minX = 10 * unit;
    maxX = 48 * unit;
    minY = 50 * unit;
  }

  if (y < 10 * unit) {
    minY = 0;
    maxY = 8 * unit;
  }

  if (x < 10 * unit) {
    minX = 0;
    maxX = 8 * unit;
    minY = 0;
    maxY = 58 * unit;
  }

  return meetsMinMax(x + deltaX, y + deltaY, minX, minY, maxX, maxY);
};

const meetsMinMax = (newX, newY, minX, minY, maxX, maxY) => {
  if (newX < minX || newX > maxX) return false;
  if (newY < minY || newY > maxY) return false;
  return true;
};

const getValidXY = (player, players, unit) => {
  const { x, y } = player;
  for (let deltaX of getShuffledArray()) {
    deltaX *= unit;
    for (let deltaY of getShuffledArray()) {
      deltaY *= unit;
      if (
        isInBounds(x, y, deltaX, deltaY, unit) &&
        players.every(other => {
          if (
            other.id === player.id ||
            2 * unit < getDistance(x + deltaX, y + deltaY, other.x, other.y)
          ) {
            return true;
          }
        })
      ) {
        return [deltaX, deltaY];
      }
    }
  }

  return [0, 0];
};

export const movePlayer = (player, element, players, unit) => {
  let [deltaX, deltaY] = getValidXY(player, players, unit);
  if (!deltaX && !deltaY) {
    element.classList.add('wiggle');
  } else {
    element.style.setProperty('--translate-x', `${deltaX}px`);
    element.style.setProperty('--translate-y', `${deltaY}px`);

    player.x += deltaX;
    player.y += deltaY;

    element.classList.add('wander');
  }
  element.addEventListener('animationend', () => {
    if (element.classList.contains('wander')) {
      element.classList.remove('wander');
      element.style.left = player.x + 'px';
      element.style.top = player.y + 'px';
      element.style.removeProperty('--translate-x');
      element.style.removeProperty('--translate-y');
      element.classList.add('wiggle');
    } else {
      element.classList.remove('wiggle');
    }
  });
};
