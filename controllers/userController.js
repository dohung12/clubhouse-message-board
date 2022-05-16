const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.membership_update_get = (req, res, next) => {
  res.render('passcode_form', {
    title: 'Become a member',
    type: 'Membership',
    verify: res.locals.currentUser,
  });
};

exports.membership_update_post = [
  body('passcode')
    .custom((value) => {
      const secretPasscode = 'become a member';

      if (value !== secretPasscode) {
        throw new Error('Incorrect secret passcode');
      }
      // Indicate the success of this sync custom validator.
      return true;
    })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    let user = await User.findById(req.params.id);
    if (!user) {
      const err = new Error("User doesn't exist");
      err.status = 404;
      return next(err);
    }

    if (!errors.isEmpty()) {
      res.render('passcode_form', {
        title: 'Become a member',
        type: 'Membership',
        errors: errors.array(),
      });
      return;
    } else {
      user.membership = true;
      await user.save();
      res.redirect('/');
    }
  },
];

exports.admin_update_get = (req, res, next) => {
  res.render('passcode_form', {
    title: 'Become an admin',
    type: 'Admin',
  });
};

exports.admin_update_post = [
  body('passcode')
    .custom((value) => {
      const secretPasscode = 'become an admin';

      if (value !== secretPasscode) {
        throw new Error('Incorrect secret passcode');
      }
      // Indicate the success of this sync custom validator.
      return true;
    })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    let user = await User.findById(req.params.id);
    if (!user) {
      const err = new Error("User doesn't exist");
      err.status = 404;
      return next(err);
    }

    if (!errors.isEmpty()) {
      res.render('passcode_form', {
        title: 'Become an admin',
        type: 'admin',
        errors: errors.array(),
      });
      return;
    } else {
      user.admin = true;
      await user.save();
      res.redirect('/');
    }
  },
];
