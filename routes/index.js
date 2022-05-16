var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', messageController.index);

router
  .route('/sign-up')
  .get(authController.signup_get)
  .post(authController.signup_post);
router.post('/log-in', authController.login_post);
router
  .route('/membership/:id')
  .get(userController.membership_update_get)
  .post(userController.membership_update_post);
router
  .route('/admin/:id')
  .get(userController.admin_update_get)
  .post(userController.admin_update_post);
router.route('/log-out').get(authController.logout_get);
router.route('/password').get((req, res, next) => {
  res.render('password');
});

module.exports = router;
