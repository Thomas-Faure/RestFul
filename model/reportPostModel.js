const con = require("../config/db.js")
class ReportPost {
    constructor(author, post, report) {
        this.author = author;
        this.post = post;
        this.report = report;
    }
}
module.exports = ReportPost

module.exports.getAllByPost = (post_id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportPost where post=?',[post_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
}
module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportPost', (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
}
module.exports.getReport = (post, author) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportPost where post=? and author = ?', [post, author], (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
}

module.exports.getPostById = (post, author) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM post p, user u, reportPost r where r.post=? and r.author = u.user_id and r.author and p.post_id=r.post', [post, author], (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
}
module.exports.create = (report) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO reportPost (author, post,report) VALUES (?,?,?);', [report.author, report.post, report.report], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.delete = (report) => {
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM reportPost WHERE author = ? and post = ?', [report.author, report.post], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}