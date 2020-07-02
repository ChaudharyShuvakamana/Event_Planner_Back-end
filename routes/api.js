const express = require('express');
const router = express.Router();
const venueController = require("../controller/venueController");
const auth = require("../middleware/middleware");
const uploadimage = require("../middleware/uploadVenueImage");
const businessController = require("../controller/businessController");
const uploadMultiple = require("../middleware/multipleImageUpload");

const venues = new venueController();
const business = new businessController();

router.post('/addVenue',  [auth.checkVendorToken, uploadimage], venues.addVenues);
router.get('/getVenues', venues.getVenues);
router.post('/getVenueById' , venues.getVenuesById);
router.get('/getVenuesByVendor', auth.checkVendorToken, venues.getVenuesByVendor);
router.post('/addAvailableDates', venues.addAvailableDates);
router.post('/addToAlbum', [auth.checkVendorToken,uploadMultiple], venues.addToAlbum);

router.post('/addBusiness',  [auth.checkVendorToken, uploadimage], business.addBusiness);
router.get('/getBusinessByVendor', auth.checkVendorToken, business.getBusinessByVendor);
router.post('/getBusinessByCategory', business.getBusinessByCategory);
router.post('/getBusinessByLocation', business.getBusinessByLocation);
router.post('/getBusinessById', business.getBusinessById);
router.post('/addToBusinessAlbum', [auth.checkVendorToken,uploadMultiple], business.addToAlbum);
router.post('/addAvailableDatesBusiness', business.addAvailableDates);

module.exports = router;