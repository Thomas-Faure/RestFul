const express = require("express")
const router = express.Router()
const rateCommentController = require("../controller/rateCommentController")
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');
router.get("/", rateCommentController.index)
router.put("/create",Auth, rateCommentController.create)
router.get("/:author/:comment", rateCommentController.getRateByUserByComment)
router.get("/:author", rateCommentController.getRatesByUser)
router.delete("/:author/:comment/delete",Auth, rateCommentController.delete)
router.post("/:author/:comment/edit",Auth, rateCommentController.edit)


module.exports = router
