const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year_published: {
        type: Number,
        required: true,
        min: 1000,
        max: new Date().getFullYear()
    },
    min_players: {
        type: Number,
        required: true,
        min: 1
    },
    max_players: {
        type: Number,
        required: true,
        min: 1
    },
    min_age: {
        type: Number,
        required: true,
        min: 3
    },
    min_time: {
        type: Number,
        required: true,
        min: 1
    },
    max_time: {
        type: Number,
        required: true,
        min: 1
    },
    short_description: {
        type: String,
        maxLength: 150
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        validate: {
            validator: (url) => {
                return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$||''/.test(url);
            }
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher',
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

module.exports = model('Game', gameSchema);
