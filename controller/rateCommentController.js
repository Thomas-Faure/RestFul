const Rate = require("../model/rateCommentModel")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

/*
    Permet d'ajouter un like ou un dislike sur un commentaire
    Si l'utilisateur  a déjà liké(disliké) le commentaire alors supprime le like(dislike)
    Dans le "body" id du commentaire et l'information sur like ou dislike
    Dans le token l'id de l'utilisateur
*/
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
                      
                    })
                    .catch(err => {
                        res.json({result: "err"})
                        
                    })
            } else {
                Rate.edit(rate)
                    .then(() => {
                        res.json({result: "updated"})
                        
                    })
                    .catch(err => {
                        res.json({result: "err"})
                        console.log(err)
                    })
            }

        }
    })
}
/*
    Permet de récupérer tous les likes

*/
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

/*
    Permet de supprimer un like ou dislike de commentaire par l'id de l'utilisateur et du comment pass" en paramètre

*/
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

/*
    Permet de récupérer les likes et dislike de commentaire d'un utilisateur dont l'id est passé en paramètres

*/
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

/*
    Permet de récupérer les likes et dislike des commentaire d'un utilisateur dont l'id est passé en token
    Pour un post passé en paramètres

*/
exports.postRateByToken = (req,res) =>{
    var post_id = req.params.id
    var token = req.token;
    var decode = jwt.verify(token, process.env.JWT_SECRET);
    Rate.getRateFromPost(decode.id,post_id).then(resultat=>{
        res.json(resultat)
    })

}
/*
    Permet de récupérer le like ou dislike pour un post et un utilisateur dont les id sont passés en commentaires
*/
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
  
/*
    Permet de modifier un rateComment en fonction des paramètres qui donnent l'id de l'utilistateur et du comment 
    Le like ou dislike est indiqué dans le "body"
*/

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





