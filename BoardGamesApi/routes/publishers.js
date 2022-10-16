const express = require('express');
const router = express.Router();

const Game = require('../models/Game');
const Publisher = require('../models/Publisher');

router.get('/', async (req, res) => {
    const publishers = await Publisher.find({});
    res.send(publishers);
});

router.post('/', async (req, res) => {
    const publisherToCreate = req.body;
    try {
        const publisher = await Publisher.create({
            'name': publisherToCreate.name,
            'description': publisherToCreate.description,
            'creation_year': publisherToCreate.creation_year,
            'image_url': publisherToCreate.image_url,
            'city': publisherToCreate.city,
            'street_name': publisherToCreate.street_name,
            'street_number': publisherToCreate.street_number,
            'apartament_number': publisherToCreate.apartament_number,
            'official_link': publisherToCreate.official_link
        });
        res.send(publisher);
    } catch(err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }

});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const publisherToUpdate = req.body;

    try {
        const publisher = await Publisher.findOneAndUpdate({_id: id}, {
            'name': publisherToUpdate.name,
            'description': publisherToUpdate.description,
            'creation_year': publisherToUpdate.creation_year,
            'image_url': publisherToUpdate.image_url,
            'city': publisherToUpdate.city,
            'street_name': publisherToUpdate.street_name,
            'street_number': publisherToUpdate.street_number,
            'apartament_number': publisherToUpdate.apartament_number,
            'official_link': publisherToUpdate.official_link
        }, {new: true});
        res.send(publisher);
    } catch(err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        await Game.deleteMany({publisher: id})
        await Publisher.deleteOne({_id: id});
        res.sendStatus(200);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;