const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
router.get("/", userController.index)
router.get("/login/:username/:password", userController.login)
router.get("/verify",function(req, res, next) {
    var token = req.cookies.auth;
    // decode token
    if (token) {
      jwt.verify(token, 'secret', function(err, token_data) {
        if (err) {
            res.send('error');
        } else {
            res.send('connecté');
        }
      });
  
    } else {
        res.send('non connecté');
    }
}
    );


  router.get("/:id", userController.getUserById)


module.exports = router
