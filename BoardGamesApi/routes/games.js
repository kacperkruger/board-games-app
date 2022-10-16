const express = require('express');
const router = express.Router();

const Game = require('../models/Game');
const Publisher = require('../models/Publisher');

router.get('/', async (req, res) => {
    const games = await Game.find({})
    res.send(games);
});
