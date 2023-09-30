const express = require("express");
const router = express.Router();
const {Song} =  require('../models/song')
const fetch = require('node-fetch')

//  Index, Delete, Upate, Create, Edit, Show

router.get("/", async (req, res) => {
    try {
        const query = req.query.q;
        const accessToken = 'BQBG22sxXfTRSTTWxXY_pG7sS2-VQzjtUf1gf2PvrWuA28N4HOlUuXapkMqH29RbPR0NH9lWOJ_2ywrOcLR5fD0JMlT_hJuTCXDha5cgKUXh75z2G78'

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