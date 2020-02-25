const con = require("../config/db.js")
class Opinion {
    constructor(author,post,like) {
        this.author = author;
        this.post = post;
        this.like = like;
    }
}
module.exports = Opinion
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

  module.exports.create = (opinion) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO opinion (author, post,like) VALUES (?,?,?);', [opinion.author,opinion.post,opinion.like], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.delete = (opinion) =>{
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM opinion WHERE author = ? and post = ?', [opinion.author,opinion.post], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}


  
