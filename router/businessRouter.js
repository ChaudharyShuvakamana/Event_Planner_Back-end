const express = require('express');
const router = express.Router();
const business = require('../controller/businessController');
const auth = require("../middleware/middleware");
const uploadimage = require("../middleware/uploadVenueImage");


router.post('/addBusiness', [auth.checkVendorToken, uploadimage], business.addBusiness);
router.get('/getBusinessByVendor', auth.checkVendorToken, business.getBusinessByVendor);
router.post('/getBusinessById', business.getBusinessById);
router.get('/getBusiness', business.getBusiness);
module.exports = router;