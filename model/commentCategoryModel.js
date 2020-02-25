const con = require("../config/db.js")
class CommentCategory {
    constructor(comment_category_id, description, couleur, date) {
        this.comment_category_id = comment_category_id;
        this.description = description;
        this.couleur = couleur;
    }
}
module.exports = CommentCategory
module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM commentCategory', (err, results) => {
            var string = JSON.stringify(results);
            var json = JSON.parse(string);
            if (err) {
                reject(err)
            } else {

                resolve(json)
            }
        })
    })
}
module.exports.create = (commentCategory) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO commentCategory (description, couleur) VALUES (?,?);', [commentCategory.description, commentCategory.couleur], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.delete = (comment_category_id) => {
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM commentCategory WHERE comment_category_id = ?', [comment_category_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.getCommentCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM commentCategory where comment_category_id=?', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}
module.exports.editCommentCategoryById = (commentCategory) => {
    return new Promise((resolve, reject) => {
        con.query('Update commentCategory Set description = ? and couleur = ? where comment_category_id=?', [commentCategory.description,commentCategory.couleur ,commentCategory.id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}




