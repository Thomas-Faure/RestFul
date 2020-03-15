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
        con.query('SELECT comment_id,  c.description, comment_category, c.author as "author", cc.description as "category_description",username,date,post, (SELECT Count(*) FROM rateComment where rateComment.comment=c.comment_id and rateComment.like = 1) as "like", (SELECT Count(*) FROM rateComment where rateComment.comment=c.comment_id and rateComment.like = 0) as "dislike" FROM comment c, user u, commentCategory cc Where u.user_id = c.author and cc.comment_category_id = c.comment_category ORDER BY c.date ASC', (err, res) => {
            if (err) {
                reject(err)
            } else {
               
                resolve(res)
            }
        })
    })
}
module.exports.getCommentByPostId = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT comment_id,  c.description, comment_category, c.author as "author", cc.description as "category_description",username,date,post, (SELECT Count(*) FROM rateComment where rateComment.comment=c.comment_id and rateComment.like = 1) as "like", (SELECT Count(*) FROM rateComment where rateComment.comment=c.comment_id and rateComment.like = 0) as "dislike" FROM comment c, user u, commentCategory cc Where u.user_id = c.author and cc.comment_category_id = c.comment_category and c.post = ? ORDER BY c.date ASC', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}

module.exports.updateValidationByCommentId = (id,value) => {
    return new Promise((resolve, reject) => {
        con.query('UPDATE comment SET validate = ? where comment_id=? ', [value,id], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}
module.exports.getCommentById = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT com.comment_id,com.description,com.comment_category,c.description as category_description,c.color,c.comment_category_id FROM comment com, user u, commentCategory c where comment_id=? and com.author = u.user_id and c.comment_category_id = com.comment_category', [id], (err, res) => {
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
        con.query('INSERT INTO comment (description,comment_category,author,post,date) VALUES (?,?,?,?,?);', [comment.description,comment.comment_category,comment.author,comment.post,new Date().toISOString().slice(0, 19).replace('T', ' ')], (err, res) => {
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
        con.query('UPDATE comment SET description = ? , comment_category = ? where comment_id=? ', [comment.description, comment.comment_category, comment.comment_id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}