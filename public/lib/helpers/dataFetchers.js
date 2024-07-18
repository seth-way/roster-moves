import { TEAM_IDS } from '../../assets/data/constants.js';
import { setCSSVariable } from './utility.js';

const fetchRosterFromAPI = async (year, id) => {
  try {
    await fetch(`/api/rosters/${year}/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export const getTeams = async teams => {
  const response = await fetch('./assets/data/teams.json');
  const teamData = await response.json();
  Object.assign(teams, teamData);
};

const getRoster = async (teams, team, year) => {
  const teamId = teams[team] ? teams[team].id : null;
  if (teamId) {
    const rosterData = await fetch(
      `/assets/data/rosters/${year}/${teamId}.json`
    );
    
    const roster = rosterData.json();
    return roster;
  }

  return null;
};

export const getFeaturedRoster = async (featured, teams, resetField) => {
  const { team, year } = featured;
  const roster = await getRoster(teams, team, year);
  if (!Object.keys(roster).length) {
    console.log(team);
    return;
  }
  featured.roster = roster;
  featured.baseO = roster.offense.name;
  featured.baseD = roster.defense.name;
  const teamInfo = teams[team];
  setCSSVariable('--primary', `#${teamInfo.color}`);
  setCSSVariable('--secondary', `#${teamInfo.alternateColor}`);
  resetField();
};
