const Rate = require("../model/rateCommentModel")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
exports.create = (req, res) => {

    var token = req.token;
    var decode = jwt.verify(token, process.env.JWT_SECRET);
    const author = decode.id
    const comment = req.body.comment
    const like = req.body.like
    const rate = new Rate(author,comment,like)
    Rate.getRateByUserByComment(author, comment).then(result => {
        if(result.length == 0){
            //Not liked or disliked
            Rate.create(rate)
                .then(() => {
                    res.json({result: "rated"})
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
                        res.json({result: "deleted"})
                        console.log("deleted")
                    })
                    .catch(err => {
                        res.json({result: "err"})
                        console.log(err)
                    })
            } else {
                Rate.edit(rate)
                    .then(() => {
                        res.json({result: "updated"})
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
exports.postRateByToken = (req,res) =>{
    var post_id = req.params.id
    var token = req.token;
    var decode = jwt.verify(token, process.env.JWT_SECRET);
    Rate.getRateFromPost(decode.id,post_id).then(resultat=>{
        res.json(resultat)
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





