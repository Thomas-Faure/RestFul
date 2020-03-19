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
  console.log(anonyme)
  if (token) {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    const comment = new Comment(1, description, category, decode.id, post_id,new Date().toISOString().slice(0, 19).replace('T', ' '), anonyme)
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

exports.getCommentsIdOfUserByPostId = (req,res) =>{
  var token = req.token;
  if (token) {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    Comment.getCommentsIdOfUserByPostId(decode.id,req.params.idpost)
      .then((el) => {
        console.log(el)
        res.json(el)
        
      })
      .catch(err => {
        
        res.json({})
      })
  } else {
      res.json({})
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
