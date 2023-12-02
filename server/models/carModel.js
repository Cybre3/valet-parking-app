const Mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Joi = require('joi');
const JoiPhone = Joi.extend(require('joi-phone-number'));

const markAllRequired = require('../utilities/makeAllRequired')

const carSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    lotLocation: {
        type: String,
        default: 'NOT PARKED'
    },
    carRequested: {
        type: Boolean,
        default: false
    },
    returnInProgress: {
        type: Boolean,          
        default: false
    },
    timeOfEntry: String,
    timeParked: String,
    timeRequested: String,
    timeReturned: String,
    carEnteredBy: String, // should be employee model, make required
    carParkedBy: String, // should be employee model
    carRemoveFromLotBy: String, // should be employee model
    carReturnedToCustomerBy: String, // should be employee model
});

markAllRequired(carSchema);

const CarModel = Mongoose.model('Car', carSchema);

function validateCar(input) {
    const schema = Joi.object({
        date: Joi.string().required(),
        color: Joi.string().required(),
        phone: JoiPhone.string().phoneNumber().required(),
        make: Joi.string().required(),
        model: Joi.string().required(),
    });

    return schema.validate(input);
}

exports.Car = CarModel;
exports.validate = validateCar;