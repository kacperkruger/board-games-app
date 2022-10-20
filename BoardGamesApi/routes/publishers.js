const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const Game = require('../models/Game');
const Publisher = require('../models/Publisher');

const realmPemCert = `-----BEGIN CERTIFICATE-----
MIICsTCCAZkCBgGD9aVvkjANBgkqhkiG9w0BAQsFADAcMRowGAYDVQQDDBFib2FyZC1nYW1lcy1yZWFsbTAeFw0yMjEwMjAxMzQ1MDNaFw0zMjEwMjAxMzQ2NDNaMBwxGjAYBgNVBAMMEWJvYXJkLWdhbWVzLXJlYWxtMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmCr4rPy8BJFsiPyfQBcJGSMRfZQFwSYWG8F7CLo/u376t0rXoHXGskx9YZVv0fGLcspMI+o7DKni/8BVNxOOL5NwNXDs7cEMP1rDSUEvokwCtvGuFfneW+IWbsYj+fMhb7h+kzPPDC4kiIY/oJlDcAeV1lnYp9MqgvPaob7WfiIUisKwrGLMu8UhNPq+EnaW9qVzJ3b12eF8b+7wzphWJDUQqQf6bQO2D8PdOVWg50DQ7gxWhJm5dpUZRlJLpovU41/DzMiErRX+qjXPQYRo6DJzyvuOXyw/FNY3JlObnNPvBYleBMSpfew7wi7LlzW8kMaLJMyb+ML0lVU+w+6mdQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCESn57cPO5rLauaq05U5n/p+tgt6VgPExNWxKkX1IqdMjQb1cNPh3EP4YXrL90N05IXtQ2P8Ko04mN+gxhhQQmX1l5mb38zyXvGpI8UVYdi39Okoagk6/2adxihTIo5CTlw7zq7v2GYci7aQ0TxZ4PW0xd/6QmOE3nNE5l9KoRXtL3OLOrAU9zj4FKKRjZo0/2hjk6WCljCPVv6SwpKBxRZqhUsfzDK4wd4/OLa3W5oRr2Sqb6ViWg6TK26xGJUpjpDcvchTgJJoj6NjGWfQE1Ob8UWfkfAzM4ylO2j2JGhhB9iU+FD5dMVK6gDPAgTdM+iVaEV42tbUlhM+AUhcfd
-----END CERTIFICATE-----`

router.get('/', async (req, res) => {
    const publishers = await Publisher.find({});
    res.send(publishers);
});

router.post('/', async (req, res) => {
    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    if (!accessToken) {
        return res.status(401).send(JSON.stringify({"error": "no access token"}));
    }
    jwt.verify(accessToken, realmPemCert, {algorithms: ['RS256']}, async (err, _) => {
        if (err) {
            return res.status(401).send(err.message);
        } else {
            const publisherToCreate = req.body;
            try {
                const publisher = await Publisher.create({
                    'name': publisherToCreate.name,
                });
                res.send(publisher);
            } catch (err) {
                res.status(500).send(err.message);
            }
        }
    });



});

router.put('/:id', async (req, res) => {
    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    if (!accessToken) {
        return res.status(401).send(JSON.stringify({"error": "no access token"}));
    }
    jwt.verify(accessToken, realmPemCert, {algorithms: ['RS256']}, async (err, _) => {
        if (err) {
            return res.status(401).send(err.message);
        } else {
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
                    'apartment_number': publisherToUpdate.apartment_number,
                    'official_link': publisherToUpdate.official_link
                }, {new: true});
                res.send(publisher);
            } catch(err) {
                console.log(err.message);
                res.status(400).send(err.message);
            }
        }
    });
})

router.delete('/:id', async(req, res) => {
    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    if (!accessToken) {
        return res.status(401).send(JSON.stringify({"error": "no access token"}));
    }
    jwt.verify(accessToken, realmPemCert, {algorithms: ['RS256']}, async (err, _) => {
        if (err) {
            return res.status(401).send(err.message);
        } else {
            const id = req.params.id;
            try {
                await Game.deleteMany({publisher: id})
                await Publisher.deleteOne({_id: id});
                res.sendStatus(200);
            } catch (err) {
                res.status(400).send(err.message);
            }
        }
    });


})

module.exports = router;