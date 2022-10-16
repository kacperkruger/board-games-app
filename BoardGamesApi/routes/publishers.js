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
