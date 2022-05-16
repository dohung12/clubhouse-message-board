const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.signup_get = (req, res, next) => {
  res.render('signup_form');
};

exports.signup_post = [
  body('firstName', 'Please input your first name')
    .isLength({ min: 1 })
    .escape(),
  body('lastName', 'Please input your last name').isLength({ min: 1 }).escape(),
  body('username', 'Please input your user name')
    .notEmpty()
    .custom((value) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject('Username already in use');
        }
      });
    }),
  body('password').isLength({ min: 8 }),
  body('confirmedPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),

  (req, res, next) => {
    // get errors from a request
    const errors = validationResult(req);

    const { firstName, lastName, username, password } = req.body;
    bcrypt.hash(password, 10, (err, result) => {
      if (err) {
        return next(err);
      }
      // Success, store hashed password
      const user = new User({
        firstName,
        lastName,
        username,
        password: result,
      });
      // Error exist. Re-render form with sanitized data.
      if (!errors.isEmpty()) {
        res.render('signup_form', {
          user,
          errors: errors.array(),
        });
      } else {
        // Data from form is valid
        user.save((err) => {
          if (err) {
            return next(err);
          }

          // Success, redirect to index page
          res.redirect('/');
        });
      }
    });
  },
];

exports.login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

exports.logout_get = (req, res) => {
  req.logout();
  res.redirect('/');
};
