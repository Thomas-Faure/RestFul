const express = require("express")
const router = express.Router()
const commentController = require("../controller/reportCommentController")
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');
router.get("/",Admin,commentController.getCountReports)
router.post("/create",Auth,commentController.report)
router.get("/:comment/byToken",commentController.getPostByIdByToken)

module.exports = router
