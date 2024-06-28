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

const getValidXY = (player, players, unit) => {
  const { x, y } = player;
  for (const deltaX of getShuffledArray()) {
    for (const deltaY of getShuffledArray()) {
      if (
        players.every(other => {
          if (
            other.id === player.id ||
            2 * unit <
              getDistance(
                x + deltaX * unit,
                y + deltaY * unit,
                other.x,
                other.y
              )
          ) {
            return true;
          }
        })
      ) {
        //console.log('valid');
        //return [x + i, y + j];
        return [deltaX * unit, deltaY * unit];
      }
    }
  }
  return [0, 0];
  //return [x, y];
};

export const movePlayer = (player, element, players, unit) => {
  let [deltaX, deltaY] = getValidXY(player, players, unit);
  element.style.setProperty('--translate-x', `${deltaX}px`);
  element.style.setProperty('--translate-y', `${deltaY}px`);

  player.x += deltaX;
  player.y += deltaY;

  element.classList.add('wander');

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
  // element.addEventListener(
  //   'animationend',
  //   () => {
  //     element.classList.remove('wander');
  //     element.style.left = player.x + 'px';
  //     element.style.top = player.y + 'px';
  //     element.style.removeProperty('--translate-x');
  //     element.style.removeProperty('--translate-y');
  //   },
  //   { once: true }
  // );

  // setTimeout(() => {
  //   element.classList.add('wiggle');
  //   element.addEventListener(
  //     'animationend',
  //     () => {
  //       element.classList.remove('wiggle');
  //     },
  //     { once: true }
  //   );
  // }, 1001);
};
