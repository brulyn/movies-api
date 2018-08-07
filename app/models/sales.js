const mongoose = require('mongoose');


const SaleSchema = new mongoose.Schema({
    recipient: { type: String, default: 'Not specified' },
    product_id: mongoose.SchemaTypes.ObjectId,
    quantity: Number,
    total: mongoose.SchemaTypes.Decimal128,
    sale_date: mongoose.SchemaTypes.Date,
    payment_type: { type: String, default: 'Cash' },
    vat: mongoose.SchemaTypes.Decimal128,
    no_vat: mongoose.SchemaTypes.Decimal128,
    nettotal: mongoose.SchemaTypes.Decimal128,
    paid: mongoose.SchemaTypes.Decimal128,
    due: mongoose.SchemaTypes.Decimal128,
    profit: mongoose.SchemaTypes.Decimal128,
    employee_id: mongoose.SchemaTypes.ObjectId,
    month_year: String,
    store_id: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('Sale', SaleSchema);