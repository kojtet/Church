const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");

// get all branches
router.route("/").get( branchController.getBranches);

// get branch by id
router.route("/:id").get( branchController.getBranchById);

// add branch
router.route("/").post( branchController.addBranch);

// update branch
router.route("/:id").patch(branchController.updateBranch);

// get branch by pastor
router.route("/pastor/:id").get(branchController.getBranchByPastor);

module.exports = router;

