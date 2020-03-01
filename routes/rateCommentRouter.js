const express = require("express")
const router = express.Router()
const rateCommentController = require("../controller/rateCommentController")

router.get("/", rateCommentController.index)
router.put("/create", rateCommentController.create)
router.get("/:author/:comment", rateCommentController.getRateByUserByComment)
router.get("/:author", rateCommentController.getRatesByUser)
router.delete("/:author/:comment/delete", rateCommentController.delete)
router.post("/:author/:comment/edit", rateCommentController.edit)


module.exports = router
