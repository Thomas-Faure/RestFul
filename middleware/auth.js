const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require("dotenv").config()
/* A Faire
    Verifie si le token de l'utilisateur est valide
*/
module.exports = (req, res, next) => {
  try {
    
    var token = req.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
        if (err) {
         
          throw 'Invalid token';
        } else {
        
          next()
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