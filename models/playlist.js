const mongoose = require('../db/connection');
const { songSchema } = require('./song');
const {Schema} = mongoose;

const playlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {type: String, required: true},
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1624339389686-cfca209567df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80',
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }],
}, {timestamps: true});

const Playlist = new mongoose.model('Playlist', playlistSchema)
module.exports = Playlist