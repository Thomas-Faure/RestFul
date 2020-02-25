const express = require("express")
const router = express.Router()
const commentCategoryController = require("../controller/commentCategoryController")

router.get("/", commentCategoryController.index)
router.get("/:id", commentCategoryController.getCommentCategoryById)
router.get("/create", commentCategoryController.create)
router.get("/:id/delete", commentCategoryController.delete)
router.get("/:id/edit", commentCategoryController.edit)



module.exports = router
