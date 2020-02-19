const User = require("../model/userModel")

exports.index = (req, res) => {
    console.log("et")
    User.getAll()
    .then(resultat => {
        res.json(resultat)
    })
    .catch(err => {
      console.log(err)
        res.json({})
    })
}
exports.getUserById = (req, res) => {
  console.log("et")
  User.getUserById(req.params.id)
  .then(resultat => {
      res.json(resultat)
  })
  .catch(err => {
    console.log(err)
      res.json({})
  })
}

  

