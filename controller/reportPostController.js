const Post = require("../model/reportPostModel")
const jwt = require('jsonwebtoken');
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

exports.getCountReports = (req, res) =>{
  Post.getCountReportByPosts()
  .then(resultat=>{
    res.json(resultat)
  })
}


exports.getPostByIdByToken = (req, res) => {
  var token = req.token;
  if(token){
      jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) 
      {
          if (err) {
              res.json([])
            }else{
              let decode = jwt.verify(token, process.env.JWT_SECRET);
              let user_id = decode.id
              Post.getReport(req.params.post,user_id)
              .then(resultat => {
                  res.json(resultat)
              })
              .catch(err => {
              console.log(err)
                  res.json({})
              })
            }

      }
      )
  }else{
      res.json([])
  }
  
}

exports.getPostsReportedByUserToken= (req,res)=>{
  var token = req.token;
  if(token){
      jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) 
      {
          if (err) {
              res.json([])
            }else{
              let decode = jwt.verify(token, process.env.JWT_SECRET);
              let user_id = decode.id
              Post.getReportByUser(user_id)
              .then(resultat => {
                  res.json(resultat)
              })
              .catch(err => {
              console.log(err)
                  res.json({})
              })
            }

      }
      )
  }else{
      res.json([])
  }

}
exports.getPostById = (req, res) => {

  Post.getReport(req.params.post,req.params.author)
  .then(resultat => {
      res.json(resultat)
  })
  .catch(err => {
    console.log(err)
      res.json({})
  })
}

exports.getReportCountByPostId = (req, res) => {
 
  Post.getAllByPost(req.params.id)
  .then(resultat => {
      res.json(resultat.length)
  })
  .catch(err => {
    console.log(err)
      res.json({})
  })
}
exports.report = (req, res) => {
  // res.json("oui")
  let post_id = req.body.post_id
   var token = req.token;
   if (token) {
     jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
       if (err) {
         res.json({result: null})
       } else {
         let decode = token_data
         let user_id = decode.id
         var report = new Post(user_id,post_id,1)
         Post.getReport(post_id,user_id).then(result =>{
           let nbResult = result.length 
           if(nbResult==0){    
             Post.create(report)
             .then((el) => {
               res.json({result: true})
             })
           }else{
             //on a deja voté
             Post.delete(report)
             .then((el) => {
               res.json({result: false})
             })
           }
         })
       }
     });
 
   } else {
     res.json({result: null})
   }
   
 
 
 }

