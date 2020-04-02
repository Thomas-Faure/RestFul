const con = require("../config/db.js")
/*
    Classe RateComment
*/
class RateComment {
    constructor(author, comment, like) {
        this.author = author;
        this.comment = comment;
        this.like = like;
    }
}


module.exports = RateComment
/*
    Recupere toutes les notes de commentaires
*/
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
/*
    Recupere toutes les notes de commentaires dont l'id de l'auteur est donne en parametres
*/
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
/*
    A Faire
*/
module.exports.getRateFromPost = (userid, postid) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM rateComment r,comment c where r.comment = c.comment_id and c.post=? and r.author=?', [postid,userid], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}
/*
    Recupere les notes pour le commentaire dont l'id de l'auteur et du commentaire sont donnes en parametres
*/
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

/*
    Creer la note donne en parametres
*/
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
/*
    Supprimer la note donne en parametres
*/
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
/*
    Modifier la note donne en parametres
*/
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
