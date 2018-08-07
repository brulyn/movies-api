const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name: String,
    shop_id: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('Category',CategorySchema);