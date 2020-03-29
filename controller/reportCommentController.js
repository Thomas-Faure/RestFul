const Comment = require("../model/reportCommentModel")
const jwt = require('jsonwebtoken');

/**
 * Permet de récuperer la liste de commentaire qu'un utilisateur a reporté pour un certain post.
 * L'identifiant de l'utilisateur est récuperé via le Token
 * L'identifiant du post est passé lui en paramètre de l'URI
 */
exports.getCommentsReportByPost = (req,res)=>{
  var token = req.token;
  if(token){
      jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) 
      {
          if (err) {
              res.json([])
            }else{
              let decode = jwt.verify(token, process.env.JWT_SECRET);
              let user_id = decode.id
           
              Comment.getReportsByPost(req.params.id,user_id)
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
                Comment.getReport(req.params.comment,user_id)
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

  /**
   * Permet de compter le nombre de report par commentaire
   */

  exports.getCountReports = (req, res) =>{
    Comment.getCountReportByComments()
    .then(resultat=>{
      res.json(resultat)
    })
  }

  /**Permet de report un commentaire via son identifiant passé en paramètre d'URI, l'identifiant de l'utlisateur lui est récuperé via le Token */
  exports.report = (req, res) => {

    let comment_id = req.body.comment_id
     var token = req.token;

     if (token) {
       jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
         if (err) {
           res.json({result: null})
         } else {
           let decode = token_data
           let user_id = decode.id
           var report = new Comment(user_id,comment_id,1)
           Comment.getReport(comment_id,user_id).then(result =>{
             let nbResult = result.length 
             if(nbResult==0){    
               Comment.create(report)
               .then((el) => {
                 res.json({result: true})
               })
             }else{
               //on a deja voté
               Comment.delete(report)
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
     