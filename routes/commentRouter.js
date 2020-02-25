const express = require("express")
const router = express.Router()
const commentController = require("../controller/commentController")

router.get("/", commentController.index)
router.get("/:id", commentController.getCommentById)
router.get("/create", commentController.create)
router.get("/:id/delete", commentController.delete)
router.get("/:id/edit", commentController.edit)



module.exports = router
