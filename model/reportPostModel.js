const con = require("../config/db.js")
module.exports.getAll = () => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM reportPost', (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
}
module.exports.getPostById = (post,author) => {
  return new Promise((resolve, reject) =>{
      con.query('SELECT * FROM post p, user u, reportPost r where r.post=? and r.author = u.user_id and r.author and p.post_id=r.post',[post,author], (err, res) => {
          if (err) {
              reject(err)
          } else {
              console.log(res)
              resolve(res)
          }
      })
  })
}