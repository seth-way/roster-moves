export const placeInFormationO = layout => {
  let x, y;

  if (layout.base === '3WR 1TE') [x, y] = place3WR1TE(layout);
  if (!x || !y) console.log('can not place players in', layout.base);
  
  return [x, y];
};

const place3WR1TE = ({ spacing, x, y, id }) => {
  if (id === 'TE1') x += 3 * spacing;
  if (id === 'WR1') x -= 5.5 * spacing;

  if (id === 'WR2') {
    x += 5.5 * spacing;
    y += 0.5 * spacing;
  }

  if (id === 'WR3') {
    x -= 4.5 * spacing;
    y += 0.5 * spacing;
  }

  if (id === 'QB1') y += 2.5 * spacing;

  if (id === 'RB1') {
    x -= 1.25 * spacing;
    y += 2.5 * spacing;
  }

  return [x, y];
};

export const placeInFormationD = layout => {
  let x, y;

  if (layout.base === 'Base 3-4 D') [x, y] = place34D(layout);
  if (!x || !y) console.log('can not place players in', layout.base);

  return [x, y];
};

const place34D = ({ spacing, x, y, id }) => {
  if (id === 'LDT') x += 1.1 * spacing;
  if (id === 'RDT') x -= 1.1 * spacing;
  if (id === 'RDE1') x -= 1.5 * spacing;
  if (id === 'LDE1') x += 1.5 * spacing;
  if (['LILB1', 'RILB1'].includes(id)) y -= 1.5 * spacing;
  if (id === 'LILB1') x += 1 * spacing;
  if (id === 'RILB1') x -= 1 * spacing;
  if (['SLB1', 'WLB1'].includes(id)) y -= 1 * spacing;
  if (id === 'SLB1') x += 2.5 * spacing;
  if (id === 'WLB1') x -= 2.5 * spacing;

  return [x, y];
};
