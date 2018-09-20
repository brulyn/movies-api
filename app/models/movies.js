const mongoose = require('mongoose');




const MovieSchema = new mongoose.Schema({
    name: String,
    description: String,
    img_url: String,
    status: String,
    views: Number,
    premier: Boolean,
    likes: Number,
    trailer_url: String
});

module.exports = mongoose.model('Movie', MovieSchema);