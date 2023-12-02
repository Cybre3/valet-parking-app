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

            carIsInSystem = new Car({ ...req.body, timeOfEntry: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}` });
            await carIsInSystem.save();

            res.status(201).send(carIsInSystem);
        }
    },

    patch: {
        assignCarLotLocation: async (req, res, next) => {
            const { lotLocation } = req.body;
            const { id } = req.params;

            let carIsInSystem = await Car.findOne({ _id: id });
            if (!carIsInSystem) return res.status(404).send('Car not found.');

            carIsInSystem.lotLocation = lotLocation;
            carIsInSystem.timeParked = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
            await carIsInSystem.save();

            res.locals.car = carIsInSystem;
            
            next();
        }
    },

    delete: {
        deleteCar: async (req, res, next) => {
            const { id } = req.params;
            const currentMsg = 'Car Deleted from all cars and moved to returned cars.';

            let carIsInSystem = await Car.findByIdAndDelete({ _id: id });
            if (!carIsInSystem) return res.status(404).send('Car not found.');

            res.locals.currentMsg = currentMsg;
            res.locals.phone = carIsInSystem.phone;
            
            next();
        }
    }
}