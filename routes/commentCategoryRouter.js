const express = require("express")
const router = express.Router()
const commentCategoryController = require("../controller/commentCategoryController")
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');
router.get("/", commentCategoryController.index)
router.get("/:id", commentCategoryController.getCommentCategoryById)
router.post("/create",Admin, commentCategoryController.create)
router.delete("/:id/delete",Admin, commentCategoryController.delete)
router.post("/:id/edit",Admin, commentCategoryController.edit)



module.exports = router
