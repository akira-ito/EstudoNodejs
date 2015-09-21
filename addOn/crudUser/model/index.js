var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: { type: String, default: "12345" },
  email: { type: String, default: "" },
  createdAt: Date,
  UpdatedAt: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports.User = User;
