const Rate = require("../model/rateCommentModel")

exports.create = (req, res) => {

    const author = req.body.author
    const comment = req.body.comment
    const like = true

    const rateComment = new RateComment(author,comment,like)
    Rate.create(rateComment)
        .then(() => {
            console.log("success")
        })
        .catch(err => {
            console.log(err)
        })
}
exports.index = (req, res) => {
    Rate.getAll()
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
    const comment = req.params.comment
    const rateComment = new Rate(author,comment,null)
    Rate.delete(rateComment)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

exports.getRatesByUser = (req, res) => {

    Rate.getRatesByUser(req.params.author)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

exports.getRateByUserByComment = (req, res) => {
    const author = req.params.author
    const comment = req.params.comment
    Rate.getRateByUserByComment(author,comment)
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
    const comment = req.params.comment
    const like = req.body.like
    const rate = new Rate(author,comment,like)
    Rate.edit(rate)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}





