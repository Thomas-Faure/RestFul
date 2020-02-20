const express = require("express")
const router = express.Router()
const postController = require("../controller/reportPostController")

router.get("/", postController.index)
router.get("/:post/:author", postController.getPostById)


module.exports = router
