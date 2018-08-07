const mongoose = require('mongoose');


const CustomerSchema = new mongoose.Schema({
    names: String,
    address: String,
    email: String,
    telephone: String
});

module.exports = mongoose.model('Customer',CustomerSchema);