const express = require('express');
const router = express.Router();
const adminControllers = require("../controllers/admin");

router.get("/update-jisr-token", adminControllers.updateJisrToken);

module.exports = router