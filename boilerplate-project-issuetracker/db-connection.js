const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const db = mongoose.connect(uri);
module.exports = db;