// Import the track model 
const Track = require('../models/track.js');
// Import libraries
const express = require('express');
const router = express.Router();

// 1.Use post() request method to create a track at "/tracks" route
router.post('/', async(req,res) => {
    // add a message to test the route
    // res.json({ message: 'Create Route'});

    // create track model here
    try {
        // create a new track with the data from req.body
        const createdTrack = await Track.create(req.body);
        res.status(201).json(createdTrack)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


// 2.Use get() to get the list of all tracks 
router.get('/', async(req,res) => {
    // add a message to test the route
    // res.json({message: 'Index Route'});

    // get all tracks
    try {
        const foundTracks = await Track.find();
        res.status(200).json(foundTracks)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})


// 3.Use get() to find a single track at '/tracks/:trackId
router.get('/:trackId', async(req, res) => {
    // add a message to test the route 
    // res.json({message: `Show the route with the param ${req.params.trackId}`});

    // find single track by its id
    try {
        const foundTrack = await Track.findById(req.params.trackId);
        //  add error handling if track is not found
        if(!foundTrack){
            res.status(404);
            throw new Error('Track not found');
        }
        res.status(200).json(foundTrack);
    } catch (error) {
        // add error handling code fir 404 errors
        if(res.statusCode === 404){
            res.json({error: error.message})
        } else{
            // add else statement to handle for all other errors
            res.status(500).json({error: error.message})
        }
    }
});

// 4. use delete() to delete a track from the list 
router.delete('/:trackId', async(req, res) => {
    // find and delete a track
    try {
        const deleteTrack = await Track.findByIdAndDelete(req.params.trackId);
         //  add error handling if track is not found 
        if(!deleteTrack){
            res.status(404);
            throw new Error('Track not found');
        }
        res.status(200).json(deleteTrack);
        
    } catch (error) {
         // add error handling code fir 404 errors
         if(res.statusCode === 404){
            res.json({error: error.message})
        } else{
            // add else statement to handle for all other errors
            res.status(500).json({error: error.message})
        }
        
    }
   
});

// 5.use put() to find and update a track
router.put('/:trackId', async(req,res) => {
    // add a message to test the route
    // res.json({message: `Update route with the param ${req.params.trackId}`});

    // Add query to update a single track
    try {
        const updatedTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body);
        // Add a check for a not found track
        if (!updatedTrack) {
          res.status(404);
          throw new Error('Track not found.');
        }
        // Add a JSON response with the updated pet
        res.status(200).json(updatedTrack);
      } catch (error) {
        // Add code for errors
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
        }
});



// Export the router
module.exports = router;