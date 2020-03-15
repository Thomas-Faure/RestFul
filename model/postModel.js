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
        con.query('SELECT post_id, title, description, post_category, p.author as "author",username,url_image,date, (SELECT Count(*) FROM opinion where opinion.post=p.post_id) as "like", (SELECT COUNT(*) FROM comment WHERE post=p.post_id) as "comment" FROM post p, user u Where u.user_id = p.author ORDER BY p.date DESC', (err, res) => {
            if (err) {
                reject(err)
            } else {
              
                resolve(res)
            }
        })
    })
}
module.exports.getBestAnswer = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * From(SELECT comment_id, post,description, ((SELECT COUNT(*) FROM rateComment WHERE rateComment.comment = c.comment_id and rateComment.like = 1)- (SELECT COUNT(*) FROM rateComment WHERE rateComment.comment = c.comment_id and rateComment.like = 0 )) rate FROM comment c Having rate = ( SELECT MAX(rate) From (SELECT comment_id, post, ((SELECT COUNT(*) FROM rateComment WHERE rateComment.comment = c1.comment_id and rateComment.like = 1) - (SELECT COUNT(*) FROM rateComment WHERE rateComment.comment = c1.comment_id and rateComment.like = 0)) rate FROM comment c1) s1 where s1.post = c.post GROUP BY post))s2 GROUP BY post', (err, res) => {
            if (err) {
                reject(err)
            } else {
              
                resolve(res)
            }
        })
    })
}

module.exports.getPostById = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT p.post_id,p.title,p.description,p.post_category,p.author,p.url_image,p.date,c.description as categoryDescription,c.couleur as couleur FROM post p, user u, postCategory c where post_id=? and p.author = u.user_id and c.post_category_id = p.post_category', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                
                resolve(res)
            }
        })
    })
}
module.exports.create = (post) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO post (title,description,post_category,author,url_image,date) VALUES (?,?,?,?,?,?);', [post.title, post.description, post.post_category, post.author, post.url_image, post.date], (err, res) => {
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
        con.query('UPDATE post SET  title = ?, description = ?, post_category = ?, url_image = ? where post_id=?', [post.title,post.description,post.post_category,post.url_image,post.post_id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}

module.exports.editImageUrlByPostId = (post_id,url) => {
    return new Promise((resolve, reject) => {
        con.query('UPDATE post SET  url_image = ? where post_id=?', [url,post_id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}