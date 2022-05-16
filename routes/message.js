const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

// router for create new message
router
  .route('/create')
  .get(messageController.create_message_get)
  .post(messageController.create_message_post);

// router for delete message
router
  .route('/:id/delete')
  .get(messageController.delete_message_get)
  .post(messageController.delete_message_post);

module.exports = router;
