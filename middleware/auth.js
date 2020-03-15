const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require("dotenv").config()

module.exports = (req, res, next) => {
  try {
    
    var token = req.token;
    console.log(token)
    if (token) {
      console.log('oui token')
      jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
        if (err) {
         
          throw 'Invalid token';
        } else {
          console.log("pas erreur")
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