const User = require("../model/userModel")
const ForgottenPassword = require("../model/forgottenPassword")
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

exports.createToken=(req,res)=>{
  var mail = req.body.mail
  User.getUserByMail(mail).then(userByMail =>{
    if(userByMail.length>0){

      var token
      require('crypto').randomBytes(32, function(ex, buf) {
        token = buf.toString('hex');
      });
      var user_id = userByMail[0].user_id
      ForgottenPassword.getTokenByUser(user_id).then(exists=>{

        if(exists.length <1){
          var forgot = new ForgottenPassword(1,token,user_id)
          ForgottenPassword.create(forgot).then(resultat=>{
            res.json(true)
            //faire l'envoie de mail
          })
    
        }else{
          ForgottenPassword.update(user_id,token).then(resultat=>{
            //faire un nouveau envoie de mail
            res.json(true)
          })
        }
    
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
      var user_id = userByToken[0]
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

  

