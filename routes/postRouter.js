const express = require("express")
const router = express.Router()
const postController = require("../controller/postController")
const commentController = require("../controller/commentController")
const Admin = require('../middleware/admin');
router.get("/", postController.index)
router.get("/bestAnswer", postController.bestAnswer)
router.get("/:id", postController.getPostById)
router.get("/:id/comments", commentController.getCommentByPost)
router.post('/create',postController.create);
router.post('/:id/comment/create',commentController.create);
router.post('/:id/edit',postController.edit)
router.delete('/:id/delete',postController.delete)
router.put("/:id/validate",Admin,postController.validate)

module.exports = router
