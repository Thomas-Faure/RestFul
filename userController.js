const User = require("../model/userModel")
const ForgottenPassword = require("../model/forgottenPassword")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('../config/config');
require("dotenv").config()

exports.index = (req, res) => {
  
    User.getAll()
    .then(resultat => {
       
 
        delete resultat.password;
       
        res.json(resultat)
    })
    .catch(err => {
      console.log(err)
        res.json({})
    })
}

const crypto = require("crypto");
async function generateToken() {
  const buffer = await new Promise((resolve, reject) => {
    crypto.randomBytes(256, function(ex, buffer) {
      if (ex) {
        reject("error generating token");
      }
      resolve(buffer);
    });
  });
  const token = crypto
    .createHash("sha1")
    .update(buffer)
    .digest("hex");


  return token;
}

function sendTokenByMail(token,mailTo){
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

var content = " Hello ! to change your password click on the link bellow \n http://localhost:3000/#/forgotPassword/"+token+" \n Have a good day !"

var mail = {
    from: "SayNoToSexism",
    to: mailTo,  // Change to email address that you want to receive messages on
    subject: 'Create new password',
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
exports.createToken=(req,res)=>{
  var mail = req.body.mail
  User.getUserByMail(mail).then(userByMail =>{
    if(userByMail.length>0){

      
      generateToken().then(token=>{
      var user_id = userByMail[0].user_id
      ForgottenPassword.getTokenByUser(user_id).then(exists=>{

        if(exists.length <1){
          var forgot = new ForgottenPassword(1,token,user_id)
          ForgottenPassword.create(forgot).then(resultat=>{
            sendTokenByMail(token,mail)
            res.json(true)
            
          })
    
        }else{
          ForgottenPassword.update(user_id,token).then(resultat=>{
            sendTokenByMail(token,mail)
            res.json(true)
          })
        }
    
      })

      })

      

    }else{
      res.json(false)
    }


  })
  

}

exports.verifyToken=(req,res)=>{
  var token = req.params.token
  var password = req.body.password
  ForgottenPassword.getUserByToken(token).then(userByToken =>{
 
    if(userByToken.length>0){
      var user_id = userByToken[0].user_id
        ForgottenPassword.delete(user_id)
        User.updatePassword(password,user_id)
        res.json(true)
    }else{
      res.json(false)
    }

  })
  

}

exports.create = (req,res)=>{
  
  var date = new Date(req.body.birthday);
  date.setDate(date.getDate() + 1);
  const user = new User(
    1,
     req.body.username,
      req.body.firstname,
       req.body.lastname,
        date,
         req.body.mail,
         0,
         req.body.sexe,
         req.body.password);
  User.create(user)
      .then(resultat => {
        
        if(resultat["affectedRows"] == 1){
          res.json({result : true})
        }
        res.json({result : false})
      })
      .catch(err => {
        res.json({result : false})
      })
}

exports.delete = (req, res) => {
  const id_User = parseInt(req.params.id)
  User.delete(id_User)
      .then(() => {
          res.sendStatus(200)
      })
      .catch(err => {
          console.log(err)
          res.status(401).send({ error: 'Erreur'})
      })
}
exports.edit = (req, res) => {
  var date = new Date(req.body.birthday);
  date.setDate(date.getDate() + 1);
  var password = req.body.password
  if(password.length <1){
    password = undefined
  }
  const user = new User(
    req.params.id,
     req.body.username,
      req.body.firstname,
       req.body.lastname,
        date,
         req.body.mail,
         req.body.admin,
         req.body.sexe,
         password);


  User.editUser(user)
      .then(resultat => {
          res.json(resultat)
      })
      .catch(err => {
          console.log(err)
          res.json({})
      })
}
exports.login = (req,res) => {
  User.login(req.body.username,req.body.password)
  .then(resultat => {
    if(resultat){
      User.getUserByUsername(req.body.username)
      .then(resultat2 =>{
        var user = {id: resultat2[0].user_id}; //!! find the user and check user from db then
        var token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24
              });

        res.json({token:token,id: resultat2[0].user_id})
      })
     
    }else{
      res.json({error:"erreur dans le mot de passe ou username"})
    }
  })
}
exports.logoff = (req, res) => {


  res.json(true)
}
exports.getUserById = (req, res) => {

  User.getUserById(req.params.id)
  .then(resultat => {
   
  
      res.json(resultat)
  })
  .catch(err => {

    console.log(err)
      res.json({})
  })
}



exports.getUserByUsername = (req, res) => {
  User.getUserByUsername(req.params.username)
  .then(resultat => {
      res.json(resultat)
  })
  .catch(err => {
    console.log(err)
      res.json({})
  })
}

  

