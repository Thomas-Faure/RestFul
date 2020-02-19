const Post = require("../model/postModel")

exports.index = (req, res) => {
    console.log("et")
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
  console.log("et")
  Post.getPostById(req.params.id)
  .then(resultat => {
      res.json(resultat)
  })
  .catch(err => {
    console.log(err)
      res.json({})
  })
}

  

