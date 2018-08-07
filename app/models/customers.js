const mongoose = require('mongoose');


const CustomerSchema = new mongoose.Schema({
    names: String,
    address: String
});

module.exports = mongoose.model('Customer',CustomerSchema);