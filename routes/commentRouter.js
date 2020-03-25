const express = require("express")
const router = express.Router()
const commentController = require("../controller/commentController")
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');
router.get("/", commentController.index)
router.get("/byUser",Auth,commentController.getCommentsByUserID)
router.get("/:id", commentController.getCommentById)
router.put("/create",Auth, commentController.create)
router.delete("/:id/delete",Auth, commentController.delete)
router.post("/:id/edit",Admin, commentController.edit)
router.put("/:id/validate",Admin,commentController.validate)



module.exports = router
