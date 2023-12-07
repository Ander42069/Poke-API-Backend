const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    types: {
        type: [String],
        required: true
    },
    power: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Pokemon', pokemonSchema)