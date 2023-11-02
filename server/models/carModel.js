const Mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Joi = require('joi');
const JoiPhone = Joi.extend(require('joi-phone-number'));

const markAllRequired = require('../utilities/makeAllRequired')

const carSchema = new Schema({
    date: String,
    color: String,
    phone: String,
    make: String,
    model: String,
    lotLocation: String
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
        lotLocation: Joi.string().required(),
    });

    return schema.validate(input);
}

exports.Car = CarModel;
exports.validate = validateCar;