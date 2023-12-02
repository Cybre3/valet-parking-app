const router = require('express')();

const carsController = require('../controllers/carsController');
const validator = require('../middleware/validateMiddleware');
const { validate: validateCar } = require('../models/carModel');

router.get('/', carsController.get.allCars);

router.post('/addcar', validator(validateCar), carsController.post.addCar);

router.patch('/:id', carsController.patch.assignCarLotLocation);

router.delete('/:id', carsController.delete.deleteCar);

module.exports = router;