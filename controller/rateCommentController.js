const Rate = require("../model/rateCommentModel")

exports.create = (req, res) => {

    const author = req.body.author
    const comment = req.body.comment
    const like = req.body.like
    const rate = new Rate(author,comment,like)
    Rate.getRateByUserByComment(author, comment).then(result => {
        if(result.length == 0){
            //Not liked or disliked
            Rate.create(rate)
                .then(() => {
                    res.json({result: like})
                    console.log("rated")
                })
                .catch(err => {
                    res.json({result: "err"})
                    console.log(err)
                })
        } else {
            //already liked or disliked
            if(result[0].like == like) {
                //remove like or dislike
                Rate.delete(rate)
                    .then(() => {
                        res.json({result: -1})
                        console.log("deleted")
                    })
                    .catch(err => {
                        res.json({result: "err"})
                        console.log(err)
                    })
            } else {
                Rate.edit(rate)
                    .then(() => {
                        res.json({result: like})
                        console.log("edited")
                    })
                    .catch(err => {
                        res.json({result: "err"})
                        console.log(err)
                    })
            }

        }
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





