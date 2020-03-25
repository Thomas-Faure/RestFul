const Post = require("../model/postModel")
const User = require("../model/userModel")
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')



exports.create = (req, res) => {

  const title = req.body.title
  const anonymous = req.body.anonymous
  const category = req.body.category
  const location = req.body.location
  const description = req.body.description

  var token = req.token;
  if (token) {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    const post = new Post(1, title, description, category, decode.id, "", new Date().toISOString().slice(0, 19).replace('T', ' '),location,anonymous)
    Post.create(post)
      .then((el) => {
        
        let extension = req.body.ext
        console.log("///////////////////////")
        console.log(extension)
        let data = req.body.data
      
        if(extension != undefined){
          if(extension.length > 0 && data.length > 0){

            let base64String = data;
            let base64Image = base64String.split(';base64,').pop();
            let fileName = "public/"+el.insertId+"."+extension
          
    
            fs.writeFile(fileName, base64Image,{ encoding: 'base64',flag: 'wx' }, function(err) {
              if (err){
                console.log(err);
              }else{
                console.log('File created');
                Post.editImageUrlByPostId(el.insertId,fileName)
              
                
              }
            });

          }
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

exports.isOwner = (req,res) =>{
  var token = req.token;
  if (token) {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    Post.isOwner(decode.id,req.params.idpost)
      .then((el) => {
        console.log(el)
        if(el.length>0){
          res.json(true)
        }else{
          res.json(false)
        }
      })
      .catch(err => {
        console.log(err)
        res.json(false)
      })
  } else {
      res.json(false)
  }

}
exports.index = (req, res) => {
  Post.getAll()
    .then(resultat => {
      resultat.forEach(element => {
        if(element.anonymous == 1){
          element.author=-1
          element.location="somewhere"
        }
      });
      delete resultat.anonymous
      res.json(resultat)
    })
    .catch(err => {
      console.log(err)
      res.json({})
    })
}

exports.bestAnswer = (req, res) => {
  Post.getBestAnswer()
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
  Post.getPostById(id)
  .then(post => {

    
  Post.delete(id)
      .then(resultat => {
        if(post[0].url_image.length>0){
          //on supprime l'image du serveur
          fs.unlink(post[0].url_image,()=>{
            console.log("file deleted")
          })
        }
          res.json(resultat)
      })
      .catch(err => {
          console.log(err)
          res.json({})
      })
    })
}
exports.edit = (req, res) => {
  const post = new Post(req.params.id, req.body.title,req.body.description,req.body.category,null,req.body.img,null,null,null)
  Post.editPost(post)
      .then(resultat => {
          res.json(resultat)
      })
      .catch(err => {
          console.log(err)
          res.json({})
      })
}

exports.validate = (req,res) =>{
  Post.updateValidationByPostId(req.params.id,1)
  .then(res.json({result:true}))
  res.json({result:false})
}



