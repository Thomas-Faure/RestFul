const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require("dotenv").config()

module.exports = (req, res, next) => {
  try {
    var token = req.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, token_data) {
          if (err) {
            throw 'Invalid token';
          } else {
              next()
          }
        });
    
    } else {
        res.status(403).json({
            error: new Error('Invalid request!')
          });
    }
      
    
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};