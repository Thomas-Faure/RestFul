var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('../config/config');

/*
    Permet d'envoyer un mail via le service google depuis le formulaire de Contact de React

*/
exports.send = (req, res, next) => {
    var transport = {
        host: 'smtp.gmail.com', 
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
        to: 'saynotosexismweb@gmail.com', 
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
