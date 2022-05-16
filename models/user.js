const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
  },
  membership: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('url').get(function () {
  return '/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);
