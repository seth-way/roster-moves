import { TEAM_IDS } from '../../assets/data/constants.js'

export const fetchRoster = async (year, id) => {
  try {
    await fetch(`/api/rosters/${year}/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export const fetchTeams = async () => {
  try {
    for (const id of TEAM_IDS) {
      await fetch(`/api/teams/${id}`);
    }
  } catch (err) {
    console.error(err);
  }
};
