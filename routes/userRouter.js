const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');
require("dotenv").config()

router.get('/logoff',Auth,userController.logoff);
router.get('/username/:username',userController.getUserByUsername);
router.post('/create',userController.create);
router.post('/:id/edit',Auth,userController.edit)
router.delete('/:id/delete',Admin,userController.delete)
router.get("/list",Admin,userController.index)
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
