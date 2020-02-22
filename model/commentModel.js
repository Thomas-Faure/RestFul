const con = require("../config/db.js")
class Comment {
    constructor(comment_id,description, comment_category, author, post) {
        this.comment_id = comment_id;
        this.description = description;
        this.comment_category = comment_category;
        this.author = author;
        this.post = post;

 
    }
}
module.exports = Post
module.exports.getAll = () => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM comment', (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
}
module.exports.getCommentByPostId = (id) => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM comment com, user u, commentCategory c where com.post=? and com.author = u.user_id and c.comment_category_id = com.comment_category',[id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
  }
module.exports.getCommentById = (id) => {
  return new Promise((resolve, reject) =>{
      con.query('SELECT * FROM comment com, user u, commentCategory c where comment_id=? and com.author = u.user_id and c.comment_category_id = com.comment_category',[id], (err, res) => {
          if (err) {
              reject(err)
          } else {
              console.log(res)
              resolve(res)
          }
      })
  })
}



  

