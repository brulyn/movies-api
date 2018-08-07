const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    names: String,
    username: String,
    email: String,
    password: String,
    store_id: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('User',UserSchema);