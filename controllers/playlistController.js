const express = require("express");
const router = express.Router();
const Playlist =  require('../models/playlist')

//  Index, Delete, Update, Create, Edit, Show

router.get("/playlists", async (req, res) => {
    try {
        const allPlaylist = await Playlist.find({});
        res.json(allPlaylist);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.delete("/playlists/:id", async (req, res) => {
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
router.post("/create-playlist", async (req, res) => {
    const data = {...req.body, userId:req.session.userId}
    console.log(data, req.session)
    try {
        const createdPlaylist = await Playlist.create(data );
        if (createdPlaylist) {
            res.status(201).json(createdPlaylist); 
        } else {
            res.status(400).json({ error: "Failed to create playlist" });
        }
    } catch (err) {
        console.error("Error creating playlist:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/playlists/:playlistId', async (req, res) => {
    try {
      const playlistId = req.params.playlistId;
      const playlist = await Playlist.findById(playlistId); // Replace with your MongoDB query
      
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
      res.status(200).json(playlist);
    } catch (error) {
      console.error('Error fetching playlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.put("/playlists/:id", async (req, res) => {
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