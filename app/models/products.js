const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: String,
    category_id: mongoose.SchemaTypes.ObjectId,
    subcategory_id: mongoose.SchemaTypes.ObjectId,
    instock: { type: mongoose.SchemaTypes.Number, default: 0 },
    outstock: { type: mongoose.SchemaTypes.Number, default: 0 },
    threshold: { type: mongoose.SchemaTypes.Number, default: 0 },
    selling_cost: { type: mongoose.SchemaTypes.Decimal128, default: 0 },
    waiting_selling_cost: { type: mongoose.SchemaTypes.Decimal128, default: 0 },
    waiting_purchasing_cost: { type: mongoose.SchemaTypes.Decimal128, default: 0 },
    purchasing_cost: { type: mongoose.SchemaTypes.Decimal128, default: 0 },
    exempted: { type:Boolean, default: false },
    stock_countdown: { type: mongoose.SchemaTypes.Number, default: 0 },
    shop_id: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('Product', ProductSchema);