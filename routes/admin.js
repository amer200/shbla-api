const express = require('express');
const router = express.Router();
const adminControllers = require("../controllers/admin");

router.get("/update-jisr-token", adminControllers.updateJisrToken);

//employees
router.get('/get-all-jisr-employees', adminControllers.getAllJisrEmployees);
router.get('/get-all-local-employees', adminControllers.getAllLocalEmployees);
router.post('/link-emoloyee-with-client', adminControllers.linkEmployeeWithClient);
router.post('/un-link-emoloyee-with-client', adminControllers.unLinkEmployeeWithClient);
//clients
router.get('/get-all-clients', adminControllers.getAllClients);
module.exports = router