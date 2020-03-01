const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require("dotenv").config()

module.exports = (req, res, next) => {
  try {
    console.log("try")
    var token = req.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
        if (err) {
          console.log("non connecté donc erreur")
          throw 'Invalid token';
        } else {
          console.log("onnecté donc peut")
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