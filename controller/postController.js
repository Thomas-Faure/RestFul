const Post = require("../model/postModel")
const User = require("../model/userModel")

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

exports.create = (req, res) => {

  console.log(req.body)
  const title = req.body.title
  const category = req.body.category
  const description = req.body.description
  var token = req.token;
  if (token) {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    const post = new Post(1, title, description, category, decode.id, "test", new Date().toISOString().slice(0, 19).replace('T', ' '))
    Post.create(post)
      .then((el) => {
       
        res.json({result: true,id :el.insertId})
      })
      .catch(err => {
        console.log(err)
        res.json({result: false,id : -1})
      })

  } else {
      res.json({error:true})
  }

  
 
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



