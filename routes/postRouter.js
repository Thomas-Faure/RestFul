const express = require("express")
const router = express.Router()
const postController = require("../controller/postController")
const commentController = require("../controller/commentController")
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');
router.get("/", postController.index)
router.get("/bestAnswer", postController.bestAnswer)
router.get("/:id", postController.getPostById)
router.get("/:id/comments", commentController.getCommentByPost)
router.post('/create',Auth,postController.create);
router.post('/:id/comment/create',Auth,commentController.create);
router.post('/:id/edit',Auth,postController.edit)
router.delete('/:id/delete',Auth,postController.delete)
router.put("/:id/validate",Admin,postController.validate)

module.exports = router
