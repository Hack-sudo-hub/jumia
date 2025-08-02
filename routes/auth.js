const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
require("dotenv").config(); //Load environment variable

router.post('/auth/sign-up',usersController.registerUser);

module.exports = router;