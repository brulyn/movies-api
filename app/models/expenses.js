const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    product_id: mongoose.SchemaTypes.ObjectId,
    quantity: Number,
    total: mongoose.SchemaTypes.Decimal128,
    expense_date: mongoose.SchemaTypes.Date,
    employee_id: mongoose.SchemaTypes.ObjectId,
    store_id: mongoose.SchemaTypes.ObjectId,
    supplier_id: mongoose.SchemaTypes.ObjectId,
    cost: mongoose.SchemaTypes.Decimal128,
    month_year: String
});

module.exports = mongoose.model('Expense', ExpenseSchema);