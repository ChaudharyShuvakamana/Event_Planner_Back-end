const express = require('express');
const router = express.Router();
const venueController = require("../controller/venueController");
const auth = require("../middleware/middleware");
const uploadimage = require("../middleware/uploadVenueImage");


const venues = new venueController();

router.post('/addVenue',  [auth.checkVendorToken, uploadimage], venues.addVenues);



module.exports = router;