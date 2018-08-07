const mongoose = require('mongoose');


const StoreSchema = new mongoose.Schema({
    name: String,
    address: String,
    telephone: String,
    manager: String,
    shop_id: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('Store',StoreSchema);