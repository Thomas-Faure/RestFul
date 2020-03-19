const con = require("../config/db.js")
class Comment {
    constructor(comment_id, description, comment_category, author, post,date,anonyme) {
        this.comment_id = comment_id;
        this.description = description;
        this.comment_category = comment_category;
        this.author = author;
        this.post = post;
        this.date = date;
        this.anonyme = anonyme;

    }
}
module.exports = Comment
module.exports.getCommentsIdOfUserByPostId = (userid,postid)=>{
    return new Promise((resolve, reject) => {
        con.query('select c.comment_id from comment c where c.post=? and c.author=?',[postid,userid],(err, res) => {
            if (err) {
                reject(err)
            } else {
               
                resolve(res)
            }
        })
    })

}
module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT sr1.*, IFNULL(u.user_id,-1) AS user_id, IFNULL(u.username,"anonyme") AS username FROM (SELECT comment_id, c.description, comment_category, c.author as "author", cc.description as "category_description",date,post, (SELECT Count(*) FROM rateComment where rateComment.comment=c.comment_id and rateComment.like = 1) as "like", (SELECT Count(*) FROM rateComment where rateComment.comment=c.comment_id and rateComment.like = 0) as "dislike", cc.color,c.anonyme FROM comment c, commentCategory cc Where cc.comment_category_id = c.comment_category) sr1 Left JOIN (Select username, user_id FROM user u) u ON u.user_id = sr1.author AND anonyme = 0 ORDER BY sr1.date ASC', (err, res) => {
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
        con.query('SELECT sr1.*, IFNULL(u.user_id,-1) AS user_id, IFNULL(u.username,"anonyme") AS username FROM (SELECT comment_id, c.description, comment_category, c.author as "author", cc.description as "category_description",date,post, (SELECT Count(*) FROM rateComment where rateComment.comment=c.comment_id and rateComment.like = 1) as "like", (SELECT Count(*) FROM rateComment where rateComment.comment=c.comment_id and rateComment.like = 0) as "dislike", cc.color,c.anonyme FROM comment c, commentCategory cc Where cc.comment_category_id = c.comment_category and c.post = ?) sr1 Left JOIN (Select username, user_id FROM user u) u ON u.user_id = sr1.author AND anonyme = 0 ORDER BY sr1.date ASC', [id], (err, res) => {
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
        con.query('SELECT com.comment_id,com.description,com.comment_category,c.description as category_description,c.color,c.comment_category_id, anonyme FROM comment com, user u, commentCategory c where comment_id=? and com.author = u.user_id and c.comment_category_id = com.comment_category', [id], (err, res) => {
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
        con.query('INSERT INTO comment (description,comment_category,author,post,date,anonyme) VALUES (?,?,?,?,?,?);', [comment.description,comment.comment_category,comment.author,comment.post,new Date().toISOString().slice(0, 19).replace('T', ' '),comment.anonyme], (err, res) => {
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