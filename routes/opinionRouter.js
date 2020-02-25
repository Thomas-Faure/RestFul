const express = require("express")
const router = express.Router()
const opinionController = require("../controller/opinionController.js")

router.get("/", opinionController.index)
router.get("/:id", opinionController.getOpinionsByUser)
router.get("/create", opinionController.create)
router.get("/:author/:post", opinionController.getOpinionByUserByPost)
router.get("/:author/:post/delete", opinionController.delete)
router.get("/:author/:post/edit", opinionController.edit)



module.exports = router
