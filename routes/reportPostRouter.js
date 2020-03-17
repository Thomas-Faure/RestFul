const express = require("express")
const router = express.Router()
const postController = require("../controller/reportPostController")
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');
router.get("/",Admin,postController.getCountReports)
router.get("/:post/byToken",postController.getPostByIdByToken)
router.get("/:id/count", postController.getReportCountByPostId)
router.get("/:post/:author", postController.getPostById)
router.post("/create",Auth,postController.report)



module.exports = router
