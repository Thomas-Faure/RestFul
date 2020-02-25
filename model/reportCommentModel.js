const con = require("../config/db.js")
class ReportComment {
    constructor(author, comment, report) {
        this.author = author;
        this.comment = comment;
        this.report = report;
    }
}
module.exports = ReportComment
module.exports.getReportCommentByUser = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportComment where author=?', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
                resolve(res)
            }
        })
    })
}
module.exports.getReportCommentByUserByComment = (userid, commentId) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportComment where author=? and comment=?', [userid, commentId], (err, res) => {
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
        con.query('INSERT INTO reportComment (author, comment,report) VALUES (?,?,?);', [report.author, report.comment, report.report], (err, res) => {
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
        con.query('DELETE FROM reportComment WHERE author = ? and comment = ?', [report.author, report.comment], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}