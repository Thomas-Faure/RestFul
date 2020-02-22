const con = require("../config/db.js")

module.exports.getOpinionsByUser = (id) => {
  return new Promise((resolve, reject) =>{
      con.query('SELECT * FROM opinion where author=?',[id], (err, res) => {
          if (err) {
              reject(err)
          } else {
              console.log(res)
              resolve(res)
          }
      })
  })
}
module.exports.getOpinionByUserByPost = (userid,postId) => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM opinion where author=? and post=?',[userid,postId], (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
  }



  

