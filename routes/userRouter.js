const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const auth = require('../middleware/auth');
require("dotenv").config()

router.get('/logoff',userController.logoff);

router.post('/create',userController.create);
router.get('/delete/:id',userController.delete)
router.get("/list", auth,userController.index)
router.post("/login", userController.login)
router.get("/verify",function(req, res, next) {
    var token = req.token;
    // decode token
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function(err, token_data) {
        if (err) {
            res.json(false);
        } else {
            res.send(true)
        }
      });
  
    } else {
        res.send(false)
    }
}
    );


  router.get("/:id", userController.getUserById)


module.exports = router
