const teamIds = Array.from(Array(34), (_, i) => i + 1);

export const fetchRoster = async (year, id) => {
  try {
    await fetch(`/api/rosters/${year}/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export const fetchTeams = async () => {
  try {
    for (const id of teamIds) {
      await fetch(`/api/teams/${id}`);
    }
  } catch (err) {
    console.error(err);
  }
};
