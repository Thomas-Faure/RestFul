const Opinion = require("../model/opinionModel")
const jwt = require('jsonwebtoken');

/*
    Permet d'ajouter un opinion pour un post passer dans le "body" pour l'utilisateur dont le token est passé en paramètre
    Supprime l'opinion s'il est déjà existant dans la base de données.
*/
exports.create = (req, res) => {
    var token = req.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {

    const author = token_data.id
    const post = req.body.post
    const like = 1
    const opinion = new Opinion(author,post,like)
    Opinion.getOpinionByUserByPost(author, post).then(result => {
        if(result.length == 0){
            //Not liked
            Opinion.create(opinion)
                .then(() => {
                    res.json({result: "liked"})
                    console.log("success")
                })
                .catch(err => {
                    res.json({result: "err"})
                    console.log(err)
                })
        } else {
            //already liked
            Opinion.delete(opinion)
                .then(() => {
                    res.json({result: "deleted"})
                    console.log("success")
                })
                .catch(err => {
                    res.json({result: "err"})
                    console.log(err)
                })
        }
    })


      })
    }else{
        res.json({result: "error"})
    }


    
}

/*
    Permet de récupérer au format json les opinions 

*/
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

/*
    Permet de supprimer l'opinion dont l'id du post et de l'auteur sont passés en paramètres

*/
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
/*
    Permet de modifier l'opinion dont l'id du post et de l'auteur sont passés en paramètres

*/
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


/*
    Permet de récupérer les opinions d'un user dont l'id est passé en paramètres
*/
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
/*
    Permet de récupérer les opinions d'un post dont l'id est passé en paramètres

*/
exports.getOpinionsByPost = (req, res) => {
    Opinion.getOpinionsByPost(req.params.id)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

/*
    Permet de récupérer les opinions dont l'id du post et de l'auteur sont passés en paramètres

*/
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



