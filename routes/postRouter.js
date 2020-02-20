const express = require("express")
const router = express.Router()
const postController = require("../controller/postController")

router.get("/", postController.index)
router.get("/:id", postController.getPostById)


module.exports = router
