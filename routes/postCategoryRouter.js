const express = require("express")
const router = express.Router()
const postCategoryController = require("../controller/postCategoryController")
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');
router.get("/", postCategoryController.index)
router.get("/:id", postCategoryController.getPostCategoryById)
router.post("/create",Admin, postCategoryController.create)
router.delete("/:id/delete",Admin,postCategoryController.delete)
router.post("/:id/edit",Admin, postCategoryController.edit)



module.exports = router
