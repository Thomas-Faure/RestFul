const User = require("../model/userModel")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
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


exports.create = (req,res)=>{
  const username = req.body.username
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const mail = req.body.mail
  const admin = req.body.admin
  const sexe = req.body.sexe
  const password = req.body.password

  const user = new User(1,username, firstname, lastname, new Date().toISOString().slice(0, 19).replace('T', ' '), mail, admin,sexe,password) 
  User.create(user)
                        .then(() => {
                            console.log("success")
                        })
                        .catch(err => {
                            console.log(err)
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
              decode = jwt.verify(token, process.env.JWT_SECRET);
              console.log("username : "+decode.id)
        res.json({token:token})
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
  console.log("go")
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

  

