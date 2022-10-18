const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const games = require('./routes/games');
const publishers = require('./routes/publishers')


const app = express();
app.use(express.json());
app.use(cors());

app.use('/games', games);
app.use('/publishers', publishers)

const dbConnData = {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'BoardGamesApi'
};

mongoose
    .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(response => {
        console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
        const apiPort = process.env.PORT || 4000
        const apiHost = process.env.API_HOST || 'localhost';
        app.listen(apiPort, () => {
            console.log(`API server available from: http://${apiHost}:${apiPort}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB', error));
