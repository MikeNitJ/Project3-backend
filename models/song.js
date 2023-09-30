const mongoose = require('../db/connection');
const {Schema} = mongoose;

const songSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    duration: Number, // store song in seconds
    spotifyId: String,
}, {timestamps: true});

const Song = new mongoose.model('Song', songSchema)
module.exports = {
    Song, 
    songSchema
};