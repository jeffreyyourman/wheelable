const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String },
  address: { type: String},
  accessibleFriendly: { type: Boolean, default: false },
  accessibleElevator: { type: Boolean, default: false },
  accessibleRamp: { type: Boolean, default: false },
  accessibleStairs: { type: Boolean, default: false },
  reason: { type: String }
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
