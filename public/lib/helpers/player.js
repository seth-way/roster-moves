import { STARTERS } from '../../assets/data/constants.js';
import { placeInFormationO, placeInFormationD } from './placement.js';

export const getPlayerXY = (player, players, unit) => {
  let x, y;
  const { base } = player;
  const layout = {
    base,
    unit,
    spacing: 3 * unit,
    offset: getPlayerOffset(unit),
  };

  if (player.isOffense) [x, y] = getOffenseXY(player, layout);
  if (player.isDefense) [x, y] = getDefenseXY(player, layout);
  if (player.isSpecialTeams) [x, y] = getSTeamsXY(player, players, unit);

  if (!x || !y) {
    [x, y] = getRandomXY(player, players, unit);
    if (player.depth === 1) {
      console.log('CANT PLACE PLAYER\n', player.base, player.id);
    }
  }

  return [x, y];
};

const getOffenseXY = (player, layout) => {
  const { base, unit, offset, spacing } = layout;
  const { id } = player;
  const baseKey = 'offense' + base.replaceAll(' ', '').replaceAll('-', '');
  if (
    !STARTERS.offense.includes(id) &&
    !STARTERS[baseKey].includes(id)
  ) {
    return [null, null];
  }

  
  let [x, y] = [30 * unit - offset, 30 * unit + offset / 2]

  Object.assign(layout, { x, y, id });

  if (STARTERS[baseKey].includes(id)) return placeInFormationO(layout);

  if (id === 'RG1') x += spacing;
  if (id === 'RT1') x += 2 * spacing;
  if (id === 'LG1') x -= spacing;
  if (id === 'LT1') x -= 2 * spacing;

  // if (pos === 'RWR') {
  //   x += 5.5 * spacing;
  //   y += 0.5 * spacing;
  // }
  // if (pos === 'LWR') {
  //   x -= 5.5 * spacing;
  // }
  // if (pos === 'WR') {
  //   x -= 4.5 * spacing;
  //   y += 0.5 * spacing;
  // }
  return [x, y];
};

const getDefenseXY = (player, layout) => {
  const { base, unit, offset, spacing } = layout;
  const { id } = player;
  const baseKey = 'defense' + base.replaceAll(' ', '').replaceAll('-', '');

  if (
    !STARTERS.defense.includes(id) &&
    !STARTERS[baseKey].includes(id)
  ) {
    return [null, null];
  }

  let [x, y] = [30 * unit - offset, 30 * unit - offset * 2.25];

  Object.assign(layout, { x, y, id });

  if (STARTERS[baseKey].includes(player.id)) return placeInFormationD(layout);
  // if (pos === 'LDT') x += 1.1 * spacing;
  // if (pos === 'RDT') x -= 1.1 * spacing;
  // if (pos === 'LDE') x += 2.1 * spacing;
  // if (pos === 'RDE') x -= 2.1 * spacing;
  // if (['MLB', 'SLB', 'WLB'].includes(pos)) y -= 1.5 * spacing;
  // if (pos === 'SLB') x += 2.5 * spacing;
  // if (pos === 'WLB') x -= 2.5 * spacing;
  if (['LCB1', 'RCB1'].includes(id)) y -= 2 * spacing;
  if (id === 'LCB1') x += 5.5 * spacing;
  if (id === 'RCB1') x -= 5.5 * spacing;
  if (['FS1', 'SS1'].includes(id)) y -= 3 * spacing;
  if (id === 'FS1') x -= 2.5 * spacing;
  if (id === 'SS1') x += 2.5 * spacing;
  // if (pos === 'NB') y -= 8 * spacing;
  return [x, y];
};

const getSTeamsXY = (player, players, unit) => {
  let x, y;
  const rangeX = 38 * unit;
  const rangeY = 7 * unit;
  const originX = 10 * unit;
  const originY = Math.random() > 0.5 ? 0 : 50 * unit;
  let valid = false;

  while (!valid) {
    x = Math.random() * rangeX + originX;
    y = Math.random() * rangeY + originY;
    valid = Object.values(players).every(
      player => 2 * unit < getDistance(x, y, player.x, player.y)
    );
  }

  return [x, y];
};

const getRandomXY = (player, players, unit) => {
  let x, y;
  const rangeX = 8 * unit;
  const rangeY = 58 * unit;
  const originX = player.isOffense ? 0 : 50 * unit;
  let valid = false;

  while (!valid) {
    x = Math.random() * rangeX + originX;
    y = Math.random() * rangeY;
    valid = Object.values(players).every(
      player => 2 * unit < getDistance(x, y, player.x, player.y)
    );
  }

  return [x, y];
};

export const getDistance = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

export const getUnitSize = width => {
  if (width >= 600) return 10;
  if (width >= 450) return 7.5;
  return 5;
};

const getPlayerOffset = unit => (1.2 * unit + 10) / 2;

export const normalizePlayer = (
  playerInfo,
  position,
  depth,
  positionGroup,
  base
) => {
  const { jersey, headshot, links, dateOfBirth, age, shortName } = playerInfo;
  const player = {
    jersey,
    headshot,
    position,
    links,
    dateOfBirth,
    age,
    depth,
    shortName,
    base,
  };
  if (!player.jersey) player.jersey = ' ';
  player.name = playerInfo.displayName;
  player.weight = playerInfo.displayWeight;
  player.height = playerInfo.displayHeight;
  player.isOffense = positionGroup === 'offense';
  player.isDefense = positionGroup === 'defense';
  player.isSpecialTeams = positionGroup === 'specialTeams';

  return player;
};
