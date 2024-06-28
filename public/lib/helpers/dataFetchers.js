import { TEAM_IDS } from '../../assets/data/constants.js'

const fetchRosterFromAPI = async (year, id) => {
  try {
    await fetch(`/api/rosters/${year}/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export const getTeams = async (teams) => {
  const response = await fetch('./assets/data/teams.json');
  const teamData = await response.json();
  Object.assign(teams, teamData);
};

const getRoster = async (teams, team, year) => {
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

export const getFeaturedRoster = async (featured, teams) => {
  const { team, year } = featured;
  const roster = await getRoster(teams, team, year);
  featured.roster = roster;
  featured.baseO = roster.offense.name;
  featured.baseD = roster.defense.name;
};
