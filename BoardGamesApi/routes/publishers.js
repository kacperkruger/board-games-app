const express = require('express');
const router = express.Router();

const Game = require('../models/Game');
const Publisher = require('../models/Publisher');

router.get('/', async (req, res) => {
    const publishers = await Publisher.find({});
    res.send(publishers);
});
