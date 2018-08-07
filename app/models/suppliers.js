const mongoose = require('mongoose');


const SupplierSchema = new mongoose.Schema({
    names: String,
    address: String,
    email: String,
    telephone: String
});

module.exports = mongoose.model('Supplier',SupplierSchema);