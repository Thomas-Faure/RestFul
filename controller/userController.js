const User = require("../model/userModel")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require("dotenv").config()

exports.index = (req, res) => {
    console.log("et")
    User.getAll()
    .then(resultat => {
       
        console.log(resultat)
        delete resultat.password;
      
        res.json(resultat)
    })
    .catch(err => {
      console.log(err)
        res.json({})
    })
}

exports.create = (req,res)=>{
  const username = req.body.username
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const mail = req.body.mail
  const admin = req.body.admin
  const sexe = req.body.sexe
  const password = req.body.password
console.log(username)
  const user = new User(1,username, firstname, lastname, new Date().toISOString().slice(0, 19).replace('T', ' '), mail, admin,sexe,password) 
  User.create(user)
                        .then(() => {
                            console.log("success")
                        })
                        .catch(err => {
                            console.log(err)
                        })
}
exports.login = (req,res) => {
  User.login(req.params.username,req.params.password)
  .then(resultat => {
    if(resultat){
      var user = {name:req.params.username}; //!! find the user and check user from db then
      var token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
            });
      res.cookie('auth',token);
      res.send("connecté")
    }else{
      res.send("erreur dans le mot de passe ou username")
    }
  })
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

  

