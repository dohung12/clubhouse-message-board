const Message = require('../models/message');
const User = require('../models/user');

const { body, validationResult } = require('express-validator');

exports.index = async (req, res, next) => {
  try {
    const messages = await Message.find({}).sort({ title: 1 }).populate('user');
    res.render('index', {
      messages,
    });
  } catch (error) {
    next(err);
  }
};

exports.create_message_get = (req, res, next) => {
  res.render('message_form');
};

exports.create_message_post = [
  body('title', 'Message title must not be empty').isLength({ min: 1 }).trim(),
  body('messageText', 'Message body must not be empty')
    .isLength({ min: 1 })
    .trim(),
  async (req, res, next) => {
    // Check input errors form a request
    const errors = validationResult(req);
    const { title, messageText } = req.body;
    const message = new Message({
      title,
      message: messageText,
      createAt: Date.now(),
      user: req.user,
    });

    if (!errors.isEmpty()) {
      // Errors exist. Re-render message form with sanitized/ trimmed input data.
      res.render('message_form', {
        message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect('/');
    }
  },
];

exports.delete_message_get = async (req, res, next) => {
  const message = await Message.findById(req.params.id).populate('user');

  res.render('message_delete', { message });
};

exports.delete_message_post = async (req, res, next) => {
  await Message.findByIdAndRemove(req.body.id);
  res.redirect('/');
};

exports.update_message_get = (req, res, next) => {
  res.send('update new message get');
};

exports.update_message_post = (req, res, next) => {
  res.send('update new message post');
};
