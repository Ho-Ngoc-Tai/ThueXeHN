const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

router.put('/update-is-rented/:id', rentalController.updateIsRented);
router.get('/category/:category_id', rentalController.getRentalsByCategory);
router.get('/search', rentalController.searchRentals);
router.get('/', rentalController.getAllRentals);
router.get('/:id', rentalController.getRentalById);
router.post('/', rentalController.createRental);
router.put('/:id', rentalController.updateRental);
router.delete('/:id', rentalController.deleteRental);

module.exports = router;
