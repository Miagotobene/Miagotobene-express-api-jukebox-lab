// import mongoose
const mongoose = require('mongoose')

// 1.define the schema
const trackSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },

});

// 2.register the schema model using mongoose.model()
const Track = mongoose.model('Track', trackSchema);

// 3.export the model
module.exports = Track;