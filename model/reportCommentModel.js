const con = require("../config/db.js")

module.exports.getReportCommentByUser = (id) => {
  return new Promise((resolve, reject) =>{
      con.query('SELECT * FROM reportComment where author=?',[id], (err, res) => {
          if (err) {
              reject(err)
          } else {
              console.log(res)
              resolve(res)
          }
      })
  })
}
module.exports.getReportCommentByUserByComment = (userid,commentId) => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM reportComment where author=? and comment=?',[userid,commentId], (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
  }



  

