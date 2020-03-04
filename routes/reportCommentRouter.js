const express = require("express")
const router = express.Router()
const commentController = require("../controller/reportCommentController")


router.post("/create",commentController.report)
router.get("/:comment/byToken",commentController.getPostByIdByToken)

module.exports = router
