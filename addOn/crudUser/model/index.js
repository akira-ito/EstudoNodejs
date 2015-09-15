var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: {type: String, require: true},
  email: String,
  createdAt: Date,
  UpdatedAt: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
