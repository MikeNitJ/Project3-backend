const express = require("express");
const router = express.Router();
const {Song} =  require('../models/song')
const fetch = require('node-fetch')

//  Index, Delete, Upate, Create, Edit, Show

router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;

        const accessToken = 'BQDVWr-sFU0a2RBCpETpamVE1yn8x-OE42Agc42AyvcaEYy5X06krcuoz2mQtoFWuOa2Oeg1IRJgisTe0M6tYsXsWiiQv-NRNfP0IUzcnedjEdLO9Z0'


        if (!query){
            res.status(400).json({error: 'search query required'});
            return;
        }

        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            const songs = data.tracks.items;
            res.json(songs);
        } else {
            res.status(response.status).json({error: 'error searching for song'})
        }

    } catch (err) {
        res.status(400).json(err)
    }
});


module.exports = router;