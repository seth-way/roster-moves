const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
const pathToRosters = '../../../public/assets/data/rosters';

router.get('/:year/:id', async (req, res, next) => {
  const depthChart = {};
  const { year, id } = req.params;
  const endPoint = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${year}/teams/${id}/depthcharts`;
  try {
    const response = await fetch(endPoint);
    const { items } = await response.json();

    for (const { name, positions } of items) {
      const group = { name, positions: {} };
      let key = 'offense';
      if (name === 'Special Teams') key = 'specialTeams';
      if (name.endsWith('D')) key = 'defense';
      depthChart[key] = group;

      for (const positionInfo of Object.values(positions)) {
        const { position, athletes } = positionInfo;
        const { displayName, abbreviation } = position;
        depthChart[key].positions[abbreviation] = {
          abbreviation,
          name: displayName,
          players: {},
        };

        for (const athleteInfo of athletes) {
          const { rank } = athleteInfo;
          const playerResponse = await fetch(athleteInfo.athlete['$ref']);
          const playerData = await playerResponse.json();
          const targetAttributes = [
            'displayName',
            'shortName',
            'displayWeight',
            'displayHeight',
            'age',
            'dateOfBirth',
            'debutYear',
            'links',
            'headshot',
            'jersey',
          ];

          const player = targetAttributes.reduce(
            (result, key) => ({ [key]: playerData[key], ...result }),
            {}
          );

          player.links = player.links.filter(
            link => link.rel.includes('playercard') || link.rel.includes('bio')
          );

          player.links = player.links.map(({ href, text }) => ({ href, text }));

          depthChart[key].positions[abbreviation].players[rank] = player;
        }
      }
    }

    await fs.promises.writeFile(
      path.join(__dirname, pathToRosters, `${year}/${id}.json`),
      JSON.stringify(depthChart)
    );

    res.send();
  } catch (err) {
    console.error('ERROR:', err);
    next(err);
  }
});

module.exports = router;
