const express = require("express")
const router = express.Router()
const postCategoryController = require("../controller/postCategoryController")

router.get("/", postCategoryController.index)
router.get("/:id", postCategoryController.getPostCategoryById)
router.get("/create", postCategoryController.create)
router.get("/:id/delete", postCategoryController.delete)
router.get("/:id/edit", postCategoryController.edit)



module.exports = router
