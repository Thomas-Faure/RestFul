const express = require("express")
const router = express.Router()
const postController = require("../controller/postController")
const commentController = require("../controller/commentController")
router.get("/", postController.index)
router.get("/:id", postController.getPostById)
router.get("/:id/comments", commentController.getCommentByPost)
router.put('/create',postController.create);
router.post('/:id/comment/create',commentController.create);
router.post('/:id/edit',postController.edit)
router.delete('/:id/delete')


module.exports = router
