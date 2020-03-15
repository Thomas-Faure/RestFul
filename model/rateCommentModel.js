const con = require("../config/db.js")
class RateComment {
    constructor(author, comment, like) {
        this.author = author;
        this.comment = comment;
        this.like = like;
    }
}


module.exports = RateComment

module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM rateComment', (err, res) => {
            if (err) {
                reject(err)
            } else {
                
                resolve(res)
            }
        })
    })
}

module.exports.getRatesByUser = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM rateComment where author=?', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}
module.exports.getRateByUserByComment = (userid, commentId) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM rateComment where author=? and comment=?', [userid, commentId], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}
module.exports.create = (rate) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO rateComment VALUES (?,?,?);', [rate.author, rate.comment, rate.like], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.delete = (rate) => {
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM rateComment WHERE author = ? and comment = ?', [rate.author, rate.comment], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

module.exports.edit = (rate) => {
    return new Promise(function (resolve, reject) {
        con.query('UPDATE rateComment SET `like` = ? WHERE author = ? and comment = ?', [rate.like, rate.author, rate.comment], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
