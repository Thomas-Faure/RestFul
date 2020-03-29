var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('../config/config');

exports.send = (req, res, next) => {
    var transport = {
        host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
        port: 465,
        auth: {
            user: creds.USER,
            pass: creds.PASS
        }
    }

    var transporter = nodemailer.createTransport(transport)

    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = ` Nouveau mail de la part ${name}, \n  ${message}\n ${email} `

    var mail = {
        from: name,
        to: 'fsmague@gmail.com',  // Change to email address that you want to receive messages on
        subject: 'New Message from Say no to sexism',
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
}
