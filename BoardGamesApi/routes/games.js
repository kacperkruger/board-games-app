const express = require('express');
const router = express.Router();

const Game = require('../models/Game');
const Publisher = require('../models/Publisher');

router.get('/', async (req, res) => {
    const games = await Game.find({})
    res.send(games);
});

router.post('/', async (req, res) => {
    const gameToCreate = req.body;
    try {
        const game = await Game.create({
            'name': gameToCreate.name,
            'year_published': gameToCreate.year_published,
            'min_players': gameToCreate.min_players,
            'max_players': gameToCreate.max_players,
            'min_age': gameToCreate.min_age,
            'min_time': gameToCreate.min_time,
            'max_time': gameToCreate.max_time,
            'short_description': gameToCreate.short_description,
            'description': gameToCreate.description,
            'image_url': gameToCreate.image_url,
            'price': gameToCreate.price,
            'publisher': gameToCreate.publisher,
            'category': gameToCreate.category,
        });
        const publisher = await Publisher.findOne({_id: game.publisher})
        await Publisher.updateOne({_id: game.publisher}, {games: [...publisher.games, game._id]})
        res.send(game);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }

});

router.put('/:id', async (req, res) => {
    const gameToUpdate = req.body;
    const id = req.params.id;

    try {
        const game = await Game.findOneAndUpdate({_id: id},{
            'name': gameToUpdate.name,
            'year_published': gameToUpdate.year_published,
            'min_players': gameToUpdate.min_players,
            'max_players': gameToUpdate.max_players,
            'min_age': gameToUpdate.min_age,
            'min_time': gameToUpdate.min_time,
            'max_time': gameToUpdate.max_time,
            'short_description': gameToUpdate.short_description,
            'description': gameToUpdate.description,
            'image_url': gameToUpdate.image_url,
            'price': gameToUpdate.price,
            'publisher': gameToUpdate.publisher,
            'category': gameToUpdate.category,
        }, {new: true});
        res.send(game);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})
