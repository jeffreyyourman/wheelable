const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String },
  address: { type: String}, 
  accessibleFriendly: Boolean,
  reason: { type: String }
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;

