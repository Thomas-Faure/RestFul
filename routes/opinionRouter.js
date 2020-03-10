const express = require("express")
const router = express.Router()
const opinionController = require("../controller/opinionController.js")

router.get("/", opinionController.index)
router.get("/user/:id", opinionController.getOpinionsByUser)
router.get("/post/:id", opinionController.getOpinionsByPost)
router.post("/create", opinionController.create)
router.get("/:author/:post", opinionController.getOpinionByUserByPost)
router.delete("/:author/:post/delete", opinionController.delete)
router.post("/:author/:post/edit", opinionController.edit)

module.exports = router
