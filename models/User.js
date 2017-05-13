const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:  { type: String }
});

module.exports = User;

const User = mongoose.model("User", UserSchema);

