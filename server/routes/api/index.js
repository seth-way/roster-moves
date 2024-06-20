const express = require('express');
const router = express.Router();

const teamsRouter = require('./teams');
const rostersRouter = require('./rosters');

// Read - GET /api/*
router.use('/teams', teamsRouter);
router.use('/rosters', rostersRouter);

module.exports = router;
