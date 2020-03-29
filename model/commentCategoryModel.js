const con = require("../config/db.js")
/*
    Classe commentCategory
*/
class CommentCategory {
    constructor(comment_category_id, description, couleur) {
        this.comment_category_id = comment_category_id;
        this.description = description;
        this.couleur = couleur;
    }
}
module.exports = CommentCategory
/*
    Fonction pour récupérer toutes les catégories de commentaires
*/
module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM commentCategory', (err, results) => {
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
/*
    Fonction pour créer une catégorie de commentaires passé en paramètres
*/
module.exports.create = (commentCategory) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO commentCategory (description, color) VALUES (?,?);', [commentCategory.description, commentCategory.couleur], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

/*
    Fonction pour supprimer une catégorie de commentaires dont l'id est donné en paramètres
*/
module.exports.delete = (comment_category_id) => {
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM commentCategory WHERE comment_category_id = ?', [comment_category_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

/*
    Fonction pour récupérer une catégorie de commentaires dont l'id est donne en parametres
*/
module.exports.getCommentCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM commentCategory where comment_category_id=?', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}
/*
    Fonction pour modifier la catégorie de commentaires donne en parametres
*/
module.exports.editCommentCategory = (commentCategory) => {
 
    return new Promise((resolve, reject) => {
        con.query('UPDATE commentCategory set description = ? , color = ? where comment_category_id=?', [commentCategory.description,commentCategory.couleur ,commentCategory.comment_category_id], (err, res) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}




