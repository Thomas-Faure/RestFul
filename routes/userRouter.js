const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const Auth = require('../middleware/auth');
require("dotenv").config()

router.get('/logoff',userController.logoff);
router.get('/username/:username',userController.getUserByUsername);
router.post('/create',userController.create);
router.delete('/delete/:id',userController.delete)
router.get("/list",Auth,userController.index)
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


  router.get("/:id",Auth,userController.getUserById)


module.exports = router
