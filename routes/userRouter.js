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
router.delete('/:id/delete',userController.delete)
router.get("/list",Auth,userController.index)
router.post("/login", userController.login)
router.get("/verify",function(req, res, next) {
    var token = req.token;
    // decode token
    if (token) {
      decode = jwt.verify(token, process.env.JWT_SECRET);
      res.json({error:false,id:decode.id})
    } else {
        res.json({error:true})
    }
}
    );


  router.get("/:id",Auth,userController.getUserById)


module.exports = router
