const express = require("express")
const router = express.Router()
const postCategoryController = require("../controller/postCategoryController")

router.get("/", postCategoryController.index)
router.get("/:id", postCategoryController.getPostCategoryById)
router.post("/create", postCategoryController.create)
router.delete("/:id/delete", postCategoryController.delete)
router.post("/:id/edit", postCategoryController.edit)



module.exports = router
