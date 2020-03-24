const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const postController = require("../controller/postController")
const commentController = require("../controller/commentController")
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
router.get('/post/:idpost/commentsId',Auth,commentController.getCommentsIdOfUserByPostId)
router.get("/list",Admin,userController.index)
router.post("/login", userController.login)
router.post("/forgotPassword/create",userController.createToken)
router.post("/forgotPassword/verify/:token",userController.verifyToken)
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
