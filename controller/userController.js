const User = require("../model/userModel")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
exports.index = (req, res) => {
    console.log("et")
    User.getAll()
    .then(resultat => {
        res.json(resultat)
    })
    .catch(err => {
      console.log(err)
        res.json({})
    })
}
exports.login = (req,res) => {
  User.login(req.params.username,req.params.password)
  .then(resultat => {
    if(resultat){
      var user = {name:req.params.username}; //!! find the user and check user from db then
      var token = jwt.sign(user, 'secret', {
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

  

