const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  location: {
    street: String,
    district: String,
    city: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);