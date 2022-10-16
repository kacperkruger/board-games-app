const { Schema, model } = require('mongoose');

const publisherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image_url: {
        type: String
    },
    creation_year: {
        type: Number,
        required: true,
        min: 1000,
        max: new Date().getFullYear()
    },
    games: [{
        type: Schema.Types.ObjectId,
        ref: 'Publisher'
    }],
    city: {
        type: String,
        required: true
    },
    street_name: {
        type: String,
        required: true,
    },
    street_number: {
        type: String,
        required: true
    },
    apartment_number: {
        type: String,
    },
    official_link: {
        type: String,
        required: true,
        validate: {
            validator: (link) => {
                return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(link);
            }
        }
    }
});

module.exports = model('Publisher', publisherSchema);
