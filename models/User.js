const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  title:  String,
});

module.exports = User;



