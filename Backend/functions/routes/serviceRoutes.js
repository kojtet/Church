const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// get all services
router.route("/").get( serviceController.getServices);

// add service
router.route("/").post( serviceController.addService);

// get branch services
router.route("/:id").get( serviceController.getBranchServices);

// get service details
router.route("/details").get( serviceController.getServiceDetails);

// get church services
router.route("/church/:id").get( serviceController.getChurchServices);

module.exports = router;