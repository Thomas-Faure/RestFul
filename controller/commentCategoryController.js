const CommentCategory = require("../model/commentCategoryModel")

exports.create = (req, res) => {

    const description = req.body.description
    const couleur = req.body.couleur

    const commentCategory = new CommentCategory(1,description,couleur)
    Comment.create(commentCategory)
        .then(() => {
            console.log("success")
        })
        .catch(err => {
            console.log(err)
        })
}
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
exports.edit = (req, res) => {
    const commentCategory = new CommentCategory(req.params.id,req.body.description, req.body.couleur);
    CommentCategory.editCommentCategoryById(commentCategory)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

exports.getCommentCategoryById = (req, res) => {

    CommentCategory.getCommentByPostId(req.params.id)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}



