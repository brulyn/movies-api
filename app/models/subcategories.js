const mongoose = require('mongoose');


const SubcategorySchema = new mongoose.Schema({
    name: String,
    category_id: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('Subcategory',SubcategorySchema);