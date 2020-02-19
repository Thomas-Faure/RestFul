const con = require("../config/db.js")
module.exports.getAll = () => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM post', (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
}
module.exports.getPostById = (id) => {
  return new Promise((resolve, reject) =>{
      con.query('SELECT * FROM post p, user u, postCategory c where post_id=? and p.author = u.user_id and c.post_category_id = p.post_category',[id], (err, res) => {
          if (err) {
              reject(err)
          } else {
              console.log(res)
              resolve(res)
          }
      })
  })
}



  

