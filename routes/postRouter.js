const express = require("express")
const router = express.Router()
const postController = require("../controller/postController")
const commentController = require("../controller/commentController")
router.get("/", postController.index)
router.get("/:id", postController.getPostById)
router.get("/:id/comments", commentController.getCommentByPost)
router.post('/create',postController.create);
router.post('/:id/comment/create',commentController.create);



module.exports = router
