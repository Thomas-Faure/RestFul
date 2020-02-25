const Opinion = require("../model/opinionModel")

exports.create = (req, res) => {

    const author = req.body.author
    const post = req.body.post
    const like = true

    const opinion = new Opinion(author,post,like)
    Comment.create(opinion)
        .then(() => {
            console.log("success")
        })
        .catch(err => {
            console.log(err)
        })
}
exports.index = (req, res) => {
    Opinion.getAll()
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}
exports.delete = (req, res) => {
    const author = req.params.author
    const post = req.params.post
    const opinion = new Opinion(author,post,null)
    Opinion.delete(opinion)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}
exports.edit = (req, res) => {
    const author = req.params.author
    const post = req.params.post
    const like = req.body.like
    const opinion = new Opinion(author,post,like)
    Opinion.editOpinionById(opinion)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

exports.getOpinionsByUser = (req, res) => {

    Opinion.getOpinionsByUser(req.params.id)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

exports.getOpinionByUserByPost = (req, res) => {
    const author = req.params.author
    const post = req.params.post
    Opinion.getOpinionByUserByPost(author,post)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}



