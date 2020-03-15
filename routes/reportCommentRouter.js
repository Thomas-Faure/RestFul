const express = require("express")
const router = express.Router()
const commentController = require("../controller/reportCommentController")
const Admin = require('../middleware/admin');
router.get("/",Admin,commentController.getCountReports)
router.post("/create",commentController.report)
router.get("/:comment/byToken",commentController.getPostByIdByToken)

module.exports = router
