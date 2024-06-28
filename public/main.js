import { getFeaturedRoster, getTeams } from './lib/helpers/dataFetchers.js';
import { getUnitSize } from './lib/helpers/field.js';
import Field from './lib/graphics/field.js';
import { FORMATIONS, POSITIONS } from './assets/data/constants.js';
// <><> Variables <><> //
const teams = {};
const featured = {
  team: 'PHI',
  year: 2023,
  roster: null,
  baseO: null,
  baseD: null,
};
let unit = 10;
// <><> DOM Elements <><> //
const frame = document.getElementById('frame');
const playersOverlay = document.getElementById('players-overlay');
// <><> Event Listeners <><> /
document.addEventListener('DOMContentLoaded', start);
// <><> Functions <><> //
async function start() {
  try {
    await getTeams(teams);
    await getFeaturedRoster(featured, teams);

    const canvas = document.createElement('canvas');
    canvas.width = frame.clientWidth;
    canvas.height = frame.clientHeight;
    frame.appendChild(canvas);

    const field = new Field(canvas, frame, unit);

    const resizeObserver = new ResizeObserver(() => {
      if (getUnitSize(frame.clientWidth) !== unit) {
        unit = getUnitSize(frame.clientWidth);

        canvas.width = frame.clientWidth;
        canvas.height = frame.clientWidth;

        field.paint(unit);
      }
    });

    resizeObserver.observe(frame);

    field.addTeam(featured, playersOverlay);
    field.paint();
    field.animate();
  } catch (err) {
    console.error(err);
  }
}
