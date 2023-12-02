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

            res.status(201).send(carIsInSystem);
        }
    },

    patch: {
        assignCarLotLocation: async (req, res) => {
            const { lotLocation } = req.body;
            const { id } = req.params;

            let carIsInSystem = await Car.findOne({ _id: id });
            if (!carIsInSystem) return res.status(404).send('Car not found.');

            carIsInSystem.lotLocation = lotLocation;
            carIsInSystem.timeParked = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
            await carIsInSystem.save();

            res.status(200).send(carIsInSystem);
        }
    },

    delete: {
        deleteCar: async (req, res) => {
            const { id } = req.params;

            let carIsInSystem = await Car.findByIdAndDelete({ _id: id });
            if (!carIsInSystem) return res.status(404).send('Car not found.');

            res.status(200).send(`Car Deleted`);
        }
    }
}