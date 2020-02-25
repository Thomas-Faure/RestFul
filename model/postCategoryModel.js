const con = require("../config/db.js")
class PostCategory {
    constructor(comment_category_id, description, couleur, date) {
        this.comment_category_id = comment_category_id;
        this.description = description;
        this.couleur = couleur;
    }
}
module.exports = PostCategory
module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM postCategory', (err, results) => {
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
module.exports.create = (postCategory) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO postCategory (description, couleur) VALUES (?,?);', [postCategory.description, postCategory.couleur], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.delete = (post_category_id) => {
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM postCategory WHERE post_category_id = ?', [post_category_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.getPostCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM postCategory where post_category_id=?', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}
module.exports.editPostCategoryById = (postCategory) => {
    return new Promise((resolve, reject) => {
        con.query('UPDATE postCategory SET description = ?, couleur = ? where post_category_id=?', [postCategory.description, postCategory.couleur, postCategory.post_category_id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}
