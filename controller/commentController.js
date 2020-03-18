const Comment = require("../model/commentModel")
const User = require("../model/userModel")
const jwt = require('jsonwebtoken');
exports.create = (req, res) => {
  console.log(req.body)
  const description = req.body.description
  const category = req.body.category
  const post_id = req.params.id
  var token = req.token;
  var anonyme = req.body.anonyme
  if (token) {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    const comment = new Comment(1, description, category, decode.id, post_id, anonyme)
    Comment.create(comment)
      .then(() => {
        console.log("success")
        res.json({result: true})
      })
      .catch(err => {
        console.log(err)
        res.json({result: false})
      })


   

  } else {
      res.json({result:false})
  }



}

exports.validate = (req,res) =>{
  Comment.updateValidationByCommentId(req.params.id,1)
  .then(res.json({result:true}))
  res.json({result:false})
}

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
