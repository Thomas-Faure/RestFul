const PostCategory = require("../model/postCategoryModel")

exports.create = (req, res) => {

    const description = req.body.description
    const couleur = req.body.couleur

    const postCategory = new PostCategory(1,description,couleur)
    Post.create(postCategory)
        .then(() => {
            console.log("success")
        })
        .catch(err => {
            console.log(err)
        })
}
exports.index = (req, res) => {
    PostCategory.getAll()
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
    PostCategory.delete(id)
    .then(resultat => {
        res.json(resultat)
    })
    .catch(err => {
        console.log(err)
        res.json({})
    })
}
exports.edit = (req, res) => {
    const postCategory = new PostCategory(req.params.id,req.body.description, req.body.couleur);
    PostCategory.editPostCategoryById(postCategory)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}

exports.getPostCategoryById = (req, res) => {

    PostCategory.getPostCategoryById(req.params.id)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}



