import { fetchRoster, fetchTeams } from './lib/helpers/dataFetchers.js';
import { getUnitSize } from './lib/helpers/field.js';
import Field from './lib/graphics/field.js';
import { FORMATIONS, POSITIONS } from './assets/data/constants.js';

const teams = {};
const featured = {
  team: 'PHI',
  year: 2023,
  roster: null,
  baseO: null,
  baseD: null,
};
const frame = document.getElementById('frame');
let unit = 10;

const getTeams = async () => {
  const response = await fetch('./assets/data/teams.json');
  const teamData = await response.json();
  Object.assign(teams, teamData);
};

const getRoster = async (team, year) => {
  const teamId = teams[team] ? teams[team].id : null;
  if (teamId) {
    const rosterData = await fetch(
      `./assets/data/rosters/${year}/${teamId}.json`
    );

    const roster = await rosterData.json();
    // Object.keys(roster).forEach(group => {
    //   const missingPositions = [];
    //   if (!FORMATIONS[group].includes(roster[group].name)) {
    //     console.log(
    //       'FORMATION: NEEDS ADDED TO CONSTANTS...\nTo:',
    //       group,
    //       '\nFormation:',
    //       roster[group].name
    //     );
    //   }
    //   const positions = Object.keys(roster[group].positions);
    //   //console.log(roster[group].positions);
    //   for (const position of positions) {
    //     if (!POSITIONS[group].includes(position))
    //       missingPositions.push(position);
    //   }
    //   if (missingPositions.length) {
    //     console.log(
    //       'POSITION: NEEDS ADDED TO CONSTANTS...\nTo:',
    //       group,
    //       '\nFormation:',
    //       missingPositions
    //     );
    //   }
    // });
    return roster;
  }

  return null;
};

const getFeaturedRoster = async () => {
  const { team, year } = featured;
  const roster = await getRoster(team, year);
  featured.roster = roster;
  featured.baseO = roster.offense.name;
  featured.baseD = roster.defense.name;
};

const start = async () => {
  try {
    await getTeams();
    await getFeaturedRoster();

    const canvas = document.createElement('canvas');
    canvas.width = frame.clientWidth;
    canvas.height = frame.clientHeight;
    frame.appendChild(canvas);
    const playersOverlay = document.createElement('div');
    playersOverlay.id = 'players-overlay';
    frame.appendChild(playersOverlay);

    const field = new Field(canvas, frame);

    const resizeObserver = new ResizeObserver(() => {
      if (getUnitSize(frame.clientWidth) !== unit) {
        unit = getUnitSize(frame.clientWidth);

        canvas.width = frame.clientWidth;
        canvas.height = frame.clientWidth;

        field.paint(unit);
      }
    });

    resizeObserver.observe(frame);
    field.addTeam(featured, playersOverlay, unit);
    field.paint(unit);
  } catch (err) {
    console.error(err);
  }
};

document.addEventListener('DOMContentLoaded', start);
