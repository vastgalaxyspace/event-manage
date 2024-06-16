const usercontroller = require('../controller/user.controller');

const express = require('express');
const router = express.Router();

router.route('/signup').post(usercontroller.signup);
router.route('/signin').post(usercontroller.signin);
router.route('/logout').post(usercontroller.logout);