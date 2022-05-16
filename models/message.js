const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');
const MessageSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

MessageSchema.virtual('url').get(function () {
  return '/message/' + this._id;
});

MessageSchema.virtual('createAt_formatted').get(function () {
  return DateTime.fromJSDate(this.createAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Message', MessageSchema);
