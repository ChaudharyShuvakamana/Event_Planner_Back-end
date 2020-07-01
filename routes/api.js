const express = require('express');
const router = express.Router();
const venueController = require("../controller/venueController");
const auth = require("../middleware/middleware");
const uploadimage = require("../middleware/uploadVenueImage");
const businessController = require("../controller/businessController");

const venues = new venueController();
const business = new businessController();

router.post('/addVenue',  [auth.checkVendorToken, uploadimage], venues.addVenues);

router.post('/addBusiness',  [auth.checkVendorToken, uploadimage], business.addBusiness);

module.exports = router;