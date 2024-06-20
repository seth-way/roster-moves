const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
const pathToData = '../../../public/assets/data/';

const teams = {};

// Read - GET /api/items
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const endPoint = `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/teams/${id}?lang=en&region=us`;

  try {
    const response = await fetch(endPoint);
    const teamData = await response.json();

    const { location, name, abbreviation, color, alternateColor, logos } =
      teamData;
    const team = {
      id,
      location,
      name,
      abbreviation,
      color,
      alternateColor,
      logo: logos[0].href,
    };

    teams[abbreviation] = team;

    await fs.promises.writeFile(
      path.join(__dirname, pathToData, 'teams.json'),
      JSON.stringify(teams)
    );

    res.send({ added: abbreviation });
  } catch (err) {
    console.error('ERROR:', err);
    next(err);
  }
});

module.exports = router;
