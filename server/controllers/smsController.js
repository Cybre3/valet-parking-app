const { MessagingResponse } = require('twilio').twiml;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    post: {
        sendSMS: (req, res) => {
            const { message } = req.body;
            client.messages
                .create({
                    from: '18446211510',
                    body: message,
                    to: '16098151154'
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

        receiveSMS: (req, res) => {
            const twiml = new MessagingResponse();
            const readyReg = new RegExp('ready', 'i');

            if (req.body.Body === readyReg) {
                twiml.message('Your car is on the way!');
            }
            else {
                twiml.message(
                    'Are you ready for your car to be returned?'
                );
            }
            console.log(req.body)
            // client.messages
            //     .create({
            //         from: '18446211510',
            //         body: twiml.toString(),
            //         to: '16098151154'
            //     })
            //     .then(message => {
            //         res
            //             .status(200)
            //             .type('text/xml')
            //             .send({ 
            //                 smsStatusCode: message.status, messageInfo: message.sid, 
            //                 msg: message.body, 
            //                 info: message 
            //             })
            //     })
            //     .catch(err => {
            //         res.status(400).send({ smsErrorCode: err.code, smsErrorMessage: err.message })
            //     });
            res.status(200).type('text/xml').send(twiml.toString());
        }
    }
}