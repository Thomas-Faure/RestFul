const con = require("../config/db.js")
/*
    Class opinion
*/
class Opinion {
    constructor(author, post, like) {
        this.author = author;
        this.post = post;
        this.like = like;
    }
}
module.exports = Opinion

/*
    Recuperer tous les opinions
*/
module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM opinion', (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}

/*
    Recuperer les opinions d'un utilisateur dont l'id est donne en parametres
*/
module.exports.getOpinionsByUser = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM opinion where author=?', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}

/*
    Recuperer les opinions d'un post dont l'id est donne en parametres
*/
module.exports.getOpinionsByPost = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM opinion where post=?', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
              
                resolve(res)
            }
        })
    })
}

/*
    Recuperer les opinions d'un utilisateur et d'un post dont les id sont donnes en parametres
*/
module.exports.getOpinionByUserByPost = (userid, postId) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM opinion where author=? and post=?', [userid, postId], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}

/*
    Ajouter l'opinion donne en parametres
*/
module.exports.create = (opinion) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO opinion VALUES (?,?,?);', [opinion.author, opinion.post, opinion.like], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
/*
    Supprime l'opinion en parametres
*/
module.exports.delete = (opinion) => {
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM opinion WHERE author = ? and post = ?', [opinion.author, opinion.post], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
/*
    Modifie l'opinion en parametres
*/
module.exports.edit = (opinion) => {
    return new Promise(function (resolve, reject) {
        con.query('UPDATE opinion SET like = ? WHERE author = ? and post = ?', [opinion.like, opinion.author, opinion.post], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
