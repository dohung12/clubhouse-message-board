const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router
  .route('/:id/membership')
  .get(userController.membership_update_get)
  .post(userController.membership_update_post);

module.exports = router;
