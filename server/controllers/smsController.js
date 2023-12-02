const { MessagingResponse } = require('twilio').twiml;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const { Car } = require('../models/carModel');

module.exports = {
    post: {
        sendSMS: (req, res) => {
            const { message, phone } = req.body;
            client.messages
                .create({
                    from: '18446211510',
                    body: message,
                    to: `1${phone}`
                })
                .then(message => {
                    res.status(200).send({ smsStatusCode: message.status, messageInfo: message.sid, msg: message.body })
                })
                .catch(err => {
                    res.status(400).send({ smsErrorCode: err.code, smsErrorMessage: err.message })
                });



            /* 
            USED FOR RESPONSE FROM TEXT
               // twiml.message('The Robots are coming! Head for the hills!');
            
                // res.type('text/xml').send(twiml.toString());
            */
        },

        receiveCarRequestSMS: async (req, res) => {
            const twiml = new MessagingResponse();
            const readyReg = new RegExp('ready', 'i');
            const { Body } = req.body;

            if (readyReg.test(Body)) {
                const phone = req.body.From.replace("+1", "");

                let carIsInSystem = await Car.findOne({ phone });
                if (!carIsInSystem) {
                    twiml.message('Your car has already been returned or you have not stored your car.')
                } else {
                    await Car.findOneAndUpdate({ phone }, { carRequested: true, timeRequested: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}` })

                    twiml.message('We have let the Valet Service know you have requested your vehicle. Hang tight, your vehicle will be returned to you shortly.');
                }

            } else {
                twiml.message('Are you ready for your car to be returned?');
            }

            res.status(200).type('text/xml').send(twiml.toString());
        },

        sendCarInTransitSMS: (req, res) => {
            const { message, phone } = req.body;

            client.messages
                .create({
                    from: '18446211510',
                    body: message,
                    to: `1${phone}`
                })
                .then(async message => {
                    await Car.findOneAndUpdate({ phone }, { returnInProgress: true });

                    res.status(200).send({ smsStatusCode: message.status, messageInfo: message.sid, msg: message.body })
                })
                .catch(err => {
                    res.status(400).send({ smsErrorCode: err.code, smsErrorMessage: err.message })
                });

        }
    }
}