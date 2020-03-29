const CommentCategory = require("../model/commentCategoryModel")

/*
    Permet de créer un nouvelle catégorie de commentaire, avec une description et une couleur passé dans le "body"

*/
exports.create = (req, res) => {

    const description = req.body.description
    const couleur = req.body.couleur

    const commentCategory = new CommentCategory(1,description,couleur)
    CommentCategory.create(commentCategory)
    .then((el) => {
       
        res.json({result: true,id :el.insertId})
      })
      .catch(err => {
        console.log(err)
        res.json({result: false,id : -1})
      })
}

/*
    Renvoie à l'utilisateur un json avec toute les catégories de commentaires existant

*/
exports.index = (req, res) => {
    CommentCategory.getAll()
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

/*
    Permet de supprimer une catégorie de commentaire via son identifiant passé en paramètre d'URI

*/
exports.delete = (req, res) => {
    const id = req.params.id
    CommentCategory.delete(id)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

/*
    Permet de modifier un catégorie de commentaire via son identifiant passé en paramètre d'uri,
    ainsi que la nouvelle description et la nouvelle couleur passé dans le "body" de la requête
*/
exports.edit = (req, res) => {
    const commentCategory = new CommentCategory(req.params.id,req.body.description, req.body.couleur);
    CommentCategory.editCommentCategory(commentCategory)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

/*
    Retourne au format JSON les informations d'une catégorie via l'identifiant passé en paramètre d'URI

*/
exports.getCommentCategoryById = (req, res) => {

    CommentCategory.getCommentCategoryById(req.params.id)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}



