const express = require("express")
const router = express.Router()
const commentCategoryController = require("../controller/commentCategoryController")

router.get("/", commentCategoryController.index)
router.get("/:id", commentCategoryController.getCommentCategoryById)
router.post("/create", commentCategoryController.create)
router.delete("/:id/delete", commentCategoryController.delete)
router.post("/:id/edit", commentCategoryController.edit)



module.exports = router
