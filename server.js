// Import libraries and frameworks
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 4000;

// import the controller file
const trackRouter = require('./controllers/tracks.js')

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

// import middleware functions 
app.use(express.json());


// import router here
app.use('/tracks', trackRouter);

// Listen to app
app.listen(PORT, () => {
    console.log('App is listening:', PORT)
})