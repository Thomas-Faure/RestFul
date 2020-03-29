const PostCategory = require("../model/postCategoryModel")

/**
 * Permet de créer une nouvelle catégorie de post via des informations qui sont passé dans le "body"
 */
exports.create = (req, res) => {
    const description = req.body.description
    const couleur = req.body.couleur
    const image = "test"
    const postCategory = new PostCategory(1,description,couleur,image)
    PostCategory.create(postCategory)
    .then((el) => {
       
        res.json({result: true,id :el.insertId})
      })
      .catch(err => {
        console.log(err)
        res.json({result: false,id : -1})
      })
}
/**
 * Permet de récuperer toutes les catégories de commentaires
 */
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
/*
    Permet de supprimer une catégorie via son identifiant passé en paramètre d'URI
*/
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
/**
 * Permet de modifier une catégorie de post via son identifiant passé en paramètre ainsi que ses informations passé dans le body
 */
exports.edit = (req, res) => {
    const postCategory = new PostCategory(req.params.id,req.body.description, req.body.couleur,"test");
    PostCategory.editPostCategoryById(postCategory)
        .then(resultat => {
            res.json(resultat)
        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}
/**
 * Permet de récuperer la catégorie d'un post via son identifiant passé en paramètre d'URI
 * 
 */

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



