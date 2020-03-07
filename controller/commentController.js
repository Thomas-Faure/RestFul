const Comment = require("../model/commentModel")
const User = require("../model/userModel")
exports.create = (req, res) => {

  const description = req.body.description
  const comment_category = 1
  const username = req.body.username
  const post = req.body.post


  User.getUserByUsername(username)
  .then(resultat => {
 
    const author = resultat[0].user_id
    const comment = new Comment(1, description, comment_category, author, post)
    Comment.create(comment)
      .then(() => {
        console.log("success")
        res.json({result: true})
      })
      .catch(err => {
        console.log(err)
        res.json({result: false})
      })

  })

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

  const comment = new Comment(req.params.id,req.body.description,req.body.comment_category,null,null);
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
