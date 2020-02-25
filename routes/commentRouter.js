const express = require("express")
const router = express.Router()
const commentController = require("../controller/commentController")

router.get("/", commentController.index)
router.get("/:id", commentController.getCommentById)
router.put("/create", commentController.create)
router.delete("/:id/delete", commentController.delete)
router.post("/:id/edit", commentController.edit)



module.exports = router
