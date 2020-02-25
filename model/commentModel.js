const con = require("../config/db.js")
class Comment {
    constructor(comment_id, description, comment_category, author, post,date) {
        this.comment_id = comment_id;
        this.description = description;
        this.comment_category = comment_category;
        this.author = author;
        this.post = post;
        this.date = date;

    }
}
module.exports = Comment
module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM comment com, user u, commentCategory c where com.post=? and com.author = u.user_id and c.comment_category_id = com.comment_category', [id], (err, res) => {
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
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM comment com, user u, commentCategory c where comment_id=? and com.author = u.user_id and c.comment_category_id = com.comment_category', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}

module.exports.create = (comment) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO comment (description,comment_category,author,post,date) VALUES (?,?);', [comment.description,comment.comment_category,comment.author,comment.post,new Date().toISOString().slice(0, 19).replace('T', ' ')], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.delete = (comment_id) =>{
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM comment WHERE comment_id = ?', [comment_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.editCommentById = (comment) => {
    return new Promise((resolve, reject) => {
        con.query('UPDATE comment SET description = ? and comment_category = ? and author = ? and post = ? and date = ? where comment_id=? ', [comment.description, comment.comment_category,comment.author, comment.post, comment.date, comment.comment_id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}