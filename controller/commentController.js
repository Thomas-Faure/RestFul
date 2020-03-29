const Comment = require("../model/commentModel")
const User = require("../model/userModel")
const jwt = require('jsonwebtoken');


/*
  Permet de créer un nouveau commentaire avec tout les champs nécessaire passé dans le "body" par l'utilisateur effectuant la requête


*/
exports.create = (req, res) => {

  const description = req.body.description
  const category = req.body.category
  const post_id = req.params.id
  var token = req.token;
  var anonyme = req.body.anonyme

  if (token) {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    const comment = new Comment(1, description, category, decode.id, post_id,new Date().toISOString().slice(0, 19).replace('T', ' '), anonyme)
    Comment.create(comment)
      .then((identifiant) => {


        res.json({result: true,id: identifiant.insertId})
      })
      .catch(err => {
        console.log(err)
        res.json({result: false,id:-1})
      })


  } else {
      res.json({result:false,id:-1})
  }



}

/*
  Retourne l'identifiant des commentaires d'un utilisateur X par rapport à un numéro de post
  L'identifiant de l'utilisateur est récuperer par le token , l'identifiant du post lui est récuperé via l'URI
*/

exports.getCommentsIdOfUserByPostId = (req,res) =>{
  var token = req.token;
  if (token) {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    Comment.getCommentsIdOfUserByPostId(decode.id,req.params.idpost)
      .then((el) => {
       
        res.json(el)
        
      })
      .catch(err => {
        
        res.json({})
      })
  } else {
      res.json({})
  }


}

/**
 * 
 * Permet de valider un commentaire (pour un administrateur)
 * 
 */
exports.validate = (req,res) =>{
  Comment.updateValidationByCommentId(req.params.id,1)
  .then(res.json({result:true}))
  res.json({result:false})
}

/**
 * 
 * Permet de retourner en JSON la liste de tout les commentaires
 */

exports.index = (req, res) => {

  Comment.getAll()
    .then(resultat => {
      res.json(resultat)
    })
    .catch(err => {
      console.log(err)
      res.json({})
    })
}
/**
 * Retourne tout les commentaires lié à un utilisateur dont l'identifiant est passé en paramètre d'URI
 */

exports.getCommentsByUserID = (req,res)=>{

  var userid = req.params.id

  Comment.getCommentByUserId(userid).then(resultat=>{
    res.json(resultat)

  })
}

/**
 * Retourne tout les commentaires lié à un post dont l'identifiant est passé en paramètre d'URI
 */

exports.getCommentByPost = (req, res) => {

  Comment.getCommentByPostId(req.params.id)
    .then(resultat => {
      res.json(resultat)
    })
    .catch(err => {
      console.log(err)
      res.json({})
    })
}

/**
 * Permet de supprimer un commentaire grâce à son identifiant qui est passé en paramètre d'URI
 */

exports.delete = (req, res) => {
  const id = req.params.id
  Comment.delete(id)
      .then(resultat => {
          res.json(resultat)
      })
      .catch(err => {
          console.log(err)
          res.json({})
      })
}
/**
 * Permet de modifier un commentaire via son identifiant passé en paramètre d'URI ainsi que tout les champs nécessaire à la modification qui sont passé dans le "body" de la requête utilisateur
 */
exports.edit = (req, res) => {

  const comment = new Comment(req.params.id,req.body.description,req.body.comment_category,null,null,null);
  Comment.editCommentById(comment)
      .then(resultat => {
          res.json(resultat)
      })
      .catch(err => {
          console.log(err)
          res.json({})
      })
}

/**
 * Permet de récuperer les informations d'un commentaire dont l'identifiant est passé en paramètre d'URI
 */
exports.getCommentById = (req, res) => {

  Comment.getCommentById(req.params.id)
    .then(resultat => {
      res.json(resultat)
    })
    .catch(err => {
      console.log(err)
      res.json({})
    })
}
