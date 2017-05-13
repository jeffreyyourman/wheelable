const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = new Schema({
  name: String,
  street:  String,
  zip: Integer,
  city: String,
  state: String,
  country: String,
  accessibleFriendly: Boolean,
  reason: String
});

module.exports = Location;
