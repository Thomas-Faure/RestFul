const Comment = require("../model/commentModel")

exports.create = (req, res) => {

  const description = req.body.description
  const comment_category = req.body.comment_category
  const author = 3
  const post = req.body.post

  const comment = new Comment(1, description, comment_category, author, post)
  Comment.create(comment)
    .then(() => {
      console.log("success")
    })
    .catch(err => {
      console.log(err)
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
  const comment = new Comment(req.params.id,req.body.description,req.body.comment_category,req.body.author,req.body.post);
  CommentCategory.editCommentById(comment)
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
