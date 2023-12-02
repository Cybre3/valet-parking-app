require('dotenv').config();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

async function sendSystemEmail(data) {

    let config = {
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS
        }
    }

    let transporter = nodemailer.createTransport(config);

    let Mailgenerator = new Mailgen({
        theme: 'cerberus',
        product: {
            name: 'ParkMe Valet',
            link: 'https://www.parkme-valet.netlify.app'
        }
    });

    let response = {
        body: {
            greeting: 'Hello',
            name: data.firstname,
            intro: data.msg,
            action: {
                instructions: data.instructionMsg,
                button: {
                    color: '#22BC66',
                    text: data.linkText,
                    link: data.linkURL,
                    // logo: data.logo
                }
            },
            outro: 'Congratulations on joining the ParkMe Valet Team!',
            signature: `ParkMe Valet Career Success Team`
        }
    }

    let systemEmail = Mailgenerator.generate(response);

    let message = {
        from: process.env.GMAIL_EMAIL,
        to: data.email,
        subject: data.subject,
        html: systemEmail
    }
    
    try {
        return await transporter.sendMail(message);
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendSystemEmail;