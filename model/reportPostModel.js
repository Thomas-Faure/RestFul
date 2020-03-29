const con = require("../config/db.js")
/*
    Classe ReportPost
*/
class ReportPost {
    constructor(author, post, report) {
        this.author = author;
        this.post = post;
        this.report = report;
    }
}
module.exports = ReportPost

/*
    Recupere tous les signalements du post dont l'id est donne en parametres
*/
module.exports.getAllByPost = (post_id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportPost where post=?',[post_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
              
                resolve(res)
            }
        })
    })
}
/*
    Recupere le nombre de signalements de tous les posts
*/
module.exports.getCountReportByPosts = () =>{
    return new Promise((resolve, reject) => {
        con.query('SELECT count(r.post) as nbReport,r.post,p.author, p.title FROM `reportPost` r,post p where r.post = p.post_id and p.validate = 0 group by r.post order by count(r.post) desc', [], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
/*
    Recupere tous les signalements de posts
*/
module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportPost', (err, res) => {
            if (err) {
                reject(err)
            } else {
          
                resolve(res)
            }
        })
    })
}
/*
    Recupere tous les signalements de post dont l'id de l'auteur est donne en parametres
*/
module.exports.getReportByUser = (author) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportPost where author = ?', [author], (err, res) => {
            if (err) {
                reject(err)
            } else {
             
                resolve(res)
            }
        })
    })
}
/*
    Recupere le signalement de post dont l'id du post et de l'auteur sont donnes en parametres
*/
module.exports.getReport = (post, author) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reportPost where post=? and author = ?', [post, author], (err, res) => {
            if (err) {
                reject(err)
            } else {
             
                resolve(res)
            }
        })
    })
}

/*
    Recupere le signalement de post et des informations complementaires sur le post
    et l'auteur dont l'id du post et de l'auteur sont donnes en parametres

*/
module.exports.getPostById = (post, author) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM post p, user u, reportPost r where r.post=? and r.author = u.user_id and r.author and p.post_id=r.post', [post, author], (err, res) => {
            if (err) {
                reject(err)
            } else {
               
                resolve(res)
            }
        })
    })
}

/*
    Creer le signalement de post donne en parametres     
*/
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
/*
    Supprime le signalement de post donne en parametres     
*/
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