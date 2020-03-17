const express = require("express")
const router = express.Router()
const opinionController = require("../controller/opinionController.js")
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');
router.get("/", opinionController.index)
router.get("/user/:id", opinionController.getOpinionsByUser)
router.get("/post/:id", opinionController.getOpinionsByPost)
router.post("/create",Auth, opinionController.create)
router.get("/:author/:post", opinionController.getOpinionByUserByPost)
router.delete("/:author/:post/delete",Auth, opinionController.delete)
router.post("/:author/:post/edit",Auth, opinionController.edit)

module.exports = router
