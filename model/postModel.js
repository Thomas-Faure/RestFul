const con = require("../config/db.js")
class Post {
    constructor(post_id, title, description, post_category, author, url_image, date) {
        this.post_id = post_id;
        this.title = title;
        this.description = description;
        this.post_category = post_category;
        this.author = author;
        this.url_image = url_image;
        this.date = date;
    }
}
module.exports = Post
module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM post p,user u where u.user_id=p.author', (err, res) => {
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
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM post p, user u, postCategory c where post_id=? and p.author = u.user_id and c.post_category_id = p.post_category', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
}
module.exports.create = (post) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO post (post_id, title,description,post_category,author,url_image,date) VALUES (1,?,?,?,?,?,?);', [post.title, post.description, post.post_category, post.author, post.url_image, post.date], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.delete = (post_id) => {
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM post WHERE post_id = ?', [post_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

module.exports.editPost = (post) => {
    return new Promise((resolve, reject) => {
        con.query('UPDATE post SET  title = ?, description = ?, post_category = ?, author = ?, url_image = ?, date = ? where post_id=?', [post.title,post.description,post.post_category,post.author,post.url_image, post.date,post.post_id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}