import { fetchRoster, fetchTeams } from './helpers/dataFetchers.js';

const start = async () => {
  try {
    //fetchTeams();
    const response = await fetch('./assets/data/teams.json');
    const teams = await response.json();
    // for (const year of ['2022', '2021', '2020']) {
    //   for (const team of Object.values(teams)) {
    //     await fetchRoster(year, team.id);
    //   }
    // }
  } catch (err) {
    console.error(err);
  }
};

start();
