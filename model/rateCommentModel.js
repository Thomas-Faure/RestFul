const con = require("../config/db.js")

module.exports.getRatesByUser = (id) => {
  return new Promise((resolve, reject) =>{
      con.query('SELECT * FROM rateComment where author=?',[id], (err, res) => {
          if (err) {
              reject(err)
          } else {
              console.log(res)
              resolve(res)
          }
      })
  })
}
module.exports.getRateByUserByComment = (userid,commentId) => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM rateCOmment where author=? and comment=?',[userid,commentId], (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
  }



  

