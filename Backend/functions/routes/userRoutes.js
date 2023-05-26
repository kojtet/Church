const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// get all pastors
router.route('/').get(userController.getPastors);

// get pastor by id
router.route('/:id').get(userController.getPastorById);

// add pastor
router.route('/').post(userController.addPastor);



module.exports = router;



