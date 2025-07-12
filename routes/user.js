const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/user");
const authMiddlewares = require('../middlewares/auth');
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.get('/get-my-profile', authMiddlewares.isAuth, userControllers.getProfileData);
router.post('/update-profile-data', authMiddlewares.isAuth, userControllers.updateProfile);
module.exports = router