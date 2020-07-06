const express = require('express');
const router = express.Router();
const venues = require('../controller/venueController');
const auth = require("../middleware/middleware");
const uploadimage = require("../middleware/uploadVenueImage");


router.post('/addVenue',  [auth.checkVendorToken, uploadimage], venues.addVenues);
router.get('/getVenues', venues.getVenues);
router.post('/getVenueById' , venues.getVenuesById);
router.get('/getVenuesByVendor', auth.checkVendorToken, venues.getVenuesByVendor);

module.exports = router;