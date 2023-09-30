const express = require("express");
const router = express.Router();
const Playlist =  require('../models/playlist')

//  Index, Delete, Upate, Create, Edit, Show

router.get("/", async (req, res) => {
    try {
        const allPlaylist = await Playlist.find({});
        res.send(allPlaylist);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deleted = await Playlist.findByIdAndDelete(id);
        if (deleted){
            res.json({message: "playlist deleted successfully", deleted});
        } else {
            res.status(404).json({error: "playlist not found"})
        }

    } catch (err) {
        res.status(400).json(err)
    }

});

// POST - Create
router.post("/", async (req, res) => {
    console.log(req.body)
    try{
        const createdPlaylist = await Playlist.create(req.body);
        res.send(createdPlaylist);
    } catch (err) {
        res.status(400).json(err)        
    }
});

router.get("/:id", async (req, res) => {
    try{
        const foundPlaylist = await Playlist.findById(req.params.id);
        if (foundPlaylist) {
            res.json(foundPlaylist);
        } else {
            res.status(404).json({error: "playlist not found"})
        }
    } catch (err) {
        res.status(400).json(err)        
    }
});

router.put("/:id", async (req, res) => {
    try{
        const updatedPlaylist = await Playlist.findByIdAndUpdate( req.params.id , req.body, {new: true});
        if (updatedPlaylist) {
            res.json(updatedPlaylist);
        } else {
            res.status(404).json({error: 'playlist not found'})
        }
    } catch (err) {
        res.status(400).json(err)        
    }

});

module.exports = router;