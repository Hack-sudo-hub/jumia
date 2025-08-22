const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
require("dotenv").config(); //Load environment variable

router.post('/sign-up',usersController.registerUser);
router.post('/login', usersController.loginUser);

module.exports = router;