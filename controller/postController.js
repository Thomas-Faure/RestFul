const Post = require("../model/postModel")

exports.create = (req,res)=>{

  const title = req.body.title
  const description = req.body.description
  const post_category = req.body.post_category
  const author = 3
  const url_image = req.body.url_image

  const post = new Post(1,title, description, post_category, author, url_image) 
  Post.create(post)
                        .then(() => {
                            console.log("success")
                        })
                        .catch(err => {
                            console.log(err)
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

  

