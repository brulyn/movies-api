const mongoose = require('mongoose');




const ShopSchema = new mongoose.Schema({
    name: String,
    address: String,
    telephone: String,
    manager: String,
    password: String,
    date_subscribe: mongoose.SchemaTypes.Date,
    active: { type: Boolean, default: true },
    trial: { type: Boolean, default: false },
    email: String,
    vat: { type: Boolean, default: true },
    unpaid: { type: Boolean, default: true },
    fixed_price: { type: Boolean, default: false },
    currency: String,
    user_view: { type: Boolean, default: true },
    user_download: { type: Boolean, default: true },
    user_add: { type: Boolean, default: true },
    store: { type: Boolean, default: false },
    type: { type: String, default: 'SFV' }
});

module.exports = mongoose.model('Shop', ShopSchema);