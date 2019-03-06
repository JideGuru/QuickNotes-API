const express = require("express");
const router = express.Router();

const UsersController = require('../controllers/users');

router.post('/signup', UsersController.user_signup);
router.post('/login', UsersController.user_login);
router.patch('/dp/:id', UsersController.user_dp);
router.patch('/:id', UsersController.user_edit);
router.get('/:id', UsersController.view_user);
router.delete('/:id', UsersController.delete_user);

module.exports = router;