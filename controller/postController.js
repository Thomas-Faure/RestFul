const Post = require("../model/postModel")
const User = require("../model/userModel")
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')



exports.create = (req, res) => {

  const title = req.body.title
  console.log(title)
  const category = req.body.category
  console.log(category)
  const description = req.body.description
  console.log(description)
  var token = req.token;
  if (token) {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    const post = new Post(1, title, description, category, decode.id, "test", new Date().toISOString().slice(0, 19).replace('T', ' '))
    Post.create(post)
      .then((el) => {
        
        let extension = req.body.extension
        console.log(extension)
        console.log(extension.length)
        let data = req.body.data
        console.log(data.length)
        if(extension.length > 0 && data.length > 0){

          let base64String = data;
          let base64Image = base64String.split(';base64,').pop();
          let fileName = "public/"+el.insertId+"."+extension
          console.log(fileName)
  
          fs.writeFile(fileName, base64Image,{ encoding: 'base64',flag: 'wx' }, function(err) {
            if (err){
              console.log(err);
            }else{
              console.log('File created');
              Post.editImageUrlByPostId(el.insertId,fileName)
             
              
            }
          });

        }
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



