import { getFeaturedRoster, getTeams } from './lib/helpers/dataFetchers.js';
import { getUnitSize } from './lib/helpers/field.js';
import Field from './lib/graphics/field.js';
import {
  FORMATIONS,
  POSITIONS,
  TEAM_ABBREVS,
  YEARS,
} from './assets/data/constants.js';
import { createScroller, createObserver } from './lib/graphics/scrollers.js';
// <><> Variables <><> //
const teams = {};
const featured = {
  team: 'ARI',
  year: 2023,
  roster: null,
  baseO: null,
  baseD: null,
};
let unit = 10;
// <><> DOM Elements <><> //
const frame = document.getElementById('frame');
const playersOverlay = document.getElementById('players-overlay');
const teamsScroller = document.getElementById('teams-scroller');
const yearsScroller = document.getElementById('years-scroller');
// const teamsCarousel = teamsScroller.querySelector('ol');
// <><> Event Listeners <><> /
document.addEventListener('DOMContentLoaded', start);
// <><> Functions <><> //
async function start() {
  try {
    await getTeams(teams);

    const teamsData = TEAM_ABBREVS.map(abv => {
      const info = { ...teams[abv] };
      info.id = abv;
      return info;
    });

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

    await getFeaturedRoster(featured, teams, () => field.paint(unit));

    createScroller(teamsData, teamsScroller);
    createObserver(teamsScroller, observeScroller(field));

    createScroller(YEARS, yearsScroller);
    createObserver(yearsScroller, observeScroller(field));

    field.addTeam(featured, playersOverlay);
    field.animate();

    const yrs = [2020, 2021, 2022, 2023, 2024];
    console.log('TEAMS', teams);
  } catch (err) {
    console.error(err);
  }
}

function observeScroller(field) {
  return async function (team = featured.team, year = featured.year) {
    console.log('updating...\nteam:', team, '\nyear:', year);
    if (team !== featured.team || year !== featured.year) {
      if (team) featured.team = team;
      if (year) featured.year = year;
      await getFeaturedRoster(featured, teams, () =>
        field.resetRoster(featured)
      );
    }
  };
}
