const Post = require("../model/postModel")
const User = require("../model/userModel")

exports.create = (req, res) => {

  
  const title = req.body.title
  const username = req.body.username
  const description = req.body.description
  //à changer
  const post_category = 1
  //à changer
  User.getUserByUsername(username)
  .then(resultat => {
 
    const author = resultat[0].user_id
    const url_image = ""
  
    const post = new Post(1, title, description, post_category, author, url_image, new Date().toISOString().slice(0, 19).replace('T', ' '))
    Post.create(post)
      .then((el) => {
       
        res.json({result: true,id :el.insertId})
      })
      .catch(err => {
        console.log(err)
        res.json({result: false,id : -1})
      })

  })
 
}

exports.index = (req, res) => {

  Post.getAll()
    .then(resultat => {
      res.json(resultat)
    })
    .catch(err => {
      console.log(err)
      res.json({})
    })
}
exports.getPostById = (req, res) => {

  Post.getPostById(req.params.id)
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
  Post.delete(id)
      .then(resultat => {
          res.json(resultat)
      })
      .catch(err => {
          console.log(err)
          res.json({})
      })
}
exports.edit = (req, res) => {
  const post = new Post(req.params.id, req.body.title,req.body.description,req.body.category,null," ",null)
  Post.editPost(post)
      .then(resultat => {
          res.json(resultat)
      })
      .catch(err => {
          console.log(err)
          res.json({})
      })
}



