const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const User = require("../model/userModel")
require("dotenv").config()

/* A Faire
    Verifie si l'id du token correspond à un id d'utilisateur qui a le role Administrateur
*/
module.exports = (req, res, next) => {
  try {
    var token = req.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
        if (err) {
         
          throw 'Invalid token';
        } else {
            var decode = jwt.verify(token, process.env.JWT_SECRET)
            User.getUserById(decode.id)
            .then(resultat => {
                if(resultat.length>0){
                    if(resultat[0].admin == 1){
                        next()
                    }else{
                        throw 'Invalid token';
                    }
                }
            })
            .catch(err => {

                console.log(err)
                res.json({})
            })  
        }
      });

    } else {
      throw 'Invalid'
    }


  } catch {
    res.status(401).json({
      error: true
    });
  }
};