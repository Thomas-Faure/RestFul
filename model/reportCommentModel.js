const con = require("../config/db.js")
/*
    Classe ReportComment
*/
class ReportComment {
    constructor(author, comment, report) {
        this.author = author;
        this.comment = comment;
        this.report = report;
    }
}
module.exports = ReportComment

/*
    Recupere tout les signalements de commentaire dont l'id de l'auteur est donne en parametres
*/
module.exports.getReportCommentByUser = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportComment where author=?', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
             
                resolve(res)
            }
        })
    })
}

/*
    Recupere le nombre de signalements pour chaque commentaires signalé
*/
module.exports.getCountReportByComments = () =>{
    return new Promise((resolve, reject) => {
        con.query('SELECT count(r.comment) as nbReport,r.comment,c.author, c.description FROM `reportComment` r,comment c where r.comment = c.comment_id and c.validate = 0 group by r.comment order by count(r.comment) desc', [], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
/*
    Recupère les signalements dont l'id de l'auteur et du commentaire sont donnes en parametres
*/
module.exports.getReportCommentByUserByComment = (userid, commentId) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportComment where author=? and comment=?', [userid, commentId], (err, res) => {
            if (err) {
                reject(err)
            } else {
         
                resolve(res)
            }
        })
    })
}
/*
    Recupere tous les signalements de commentaires d'un post dont l'id est passe en parametres et pour un auteur donne en parametres
*/
module.exports.getReportsByPost = (post_id, author) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT r.author,r.comment,r.report FROM reportComment r, comment c where c.comment_id=r.comment and c.post=? and r.author=?', [post_id, author], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}
/*
    Recupere le signalement d'un commentaire et d'un auteur dont les id sont donnes en parametres
*/
module.exports.getReport = (comment, author) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportComment where comment=? and author = ?', [comment, author], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}
/*
    Cree le signalement donne en parametres
*/
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
/*
    Supprime le signalement donne en parametres
*/
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