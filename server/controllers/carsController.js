const { Car } = require('../models/carModel');

module.exports = {
    get: {
        allCars: async (req, res) => {
            const allCars = await Car.find({});

            res.status(200).send(allCars);
        },
    },

    post: {
        addCar: async (req, res) => {
            const { make, model, phone } = req.body;

            let carIsInSystem = await Car.findOne({ phone, make, model });
            if (carIsInSystem) return res.status(400).send('Car has already been stored.');

            carIsInSystem = new Car({ ...req.body });
            await carIsInSystem.save();

            console.log(carIsInSystem);

            res.status(201).send(carIsInSystem);
        }
    }
}