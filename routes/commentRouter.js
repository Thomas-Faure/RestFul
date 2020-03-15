const express = require("express")
const router = express.Router()
const commentController = require("../controller/commentController")
const Admin = require('../middleware/admin');
router.get("/", commentController.index)
router.get("/:id", commentController.getCommentById)
router.put("/create", commentController.create)
router.delete("/:id/delete", commentController.delete)
router.post("/:id/edit", commentController.edit)
router.put("/:id/validate",Admin,commentController.validate)


module.exports = router
