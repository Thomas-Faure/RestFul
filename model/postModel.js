const con = require("../config/db.js")
/*
    Classe Post
*/
class Post {
    constructor(post_id, title, description, post_category, author, url_image, date,location,anonymous) {
        this.post_id = post_id;
        this.title = title;
        this.description = description;
        this.post_category = post_category;
        this.author = author;
        this.url_image = url_image;
        this.date = date;
        this.location = location
        this.anonymous = anonymous
    }
}
module.exports = Post

/*
    Fonction pour récupérer l'id, le titre, la description, la catégorie, la description de la catégorie, la couleur de la catégorie
    ,l'id de l'auteur ,son username , la date de publication, l'url de l'image,
     le nombre de like, le nombre de dislike et l'information sur l'anonymat de tous les postes
*/
module.exports.getAllAdmin = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT post_id, title,anonymous, p.description,p.location, post_category,couleur, p.author as "author",username,p.url_image,pc.url_image as "url_categ",date, (SELECT Count(*) FROM opinion where opinion.post=p.post_id) as "like", (SELECT COUNT(*) FROM comment WHERE post=p.post_id) as "comment" FROM post p, user u, postCategory pc Where u.user_id = p.author and pc.post_category_id = p.post_category ORDER BY p.date DESC', (err, res) => {
            if (err) {
                reject(err)
            } else {
              
                resolve(res)
            }
        })
    })
}
/*
    Fonction pour récupérer l'id, le titre, la description, la catégorie, la description de la catégorie, la couleur de la catégorie
    ,l'id de l'auteur (mis a -1 si anonyme),son username ("anonyme" si anonyme), la date de publication, l'url de l'image,
     le nombre de like, le nombre de dislike et l'information sur l'anonymat d'un post 
*/
module.exports.getAll =  () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT sr1.*, IFNULL(u.user_id,-1) AS user_id, IFNULL(u.username,"anonyme") as username FROM (SELECT post_id, title,location, p.description, post_category,couleur, p.author as "author",p.url_image,pc.url_image as "url_categ",date, (SELECT Count(*) FROM opinion where opinion.post=p.post_id) as "like", (SELECT COUNT(*) FROM comment WHERE post=p.post_id) as "comment", p.anonymous FROM post p, postCategory pc Where pc.post_category_id = p.post_category ORDER BY p.date DESC) sr1 Left JOIN (Select username, user_id FROM user u) u ON u.user_id = sr1.author AND anonymous = 0 ORDER BY sr1.date DESC', (err, res) => {
            if (err) {
                reject(err)
            } else {
              
                resolve(res)
            }
        })
    })
}

/*
    Recupère la meilleure réponse (l'id, la description et la note d'un commentaire) pour chaque post
    Qui a un commentaire dont la meilleure note est supérieur à 0
*/
module.exports.getBestAnswer = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * From(SELECT comment_id, post,description, ((SELECT COUNT(*) FROM rateComment WHERE rateComment.comment = c.comment_id and rateComment.like = 1)- (SELECT COUNT(*) FROM rateComment WHERE rateComment.comment = c.comment_id and rateComment.like = 0 )) rate FROM comment c Having rate = ( SELECT MAX(rate) From (SELECT comment_id, post, ((SELECT COUNT(*) FROM rateComment WHERE rateComment.comment = c1.comment_id and rateComment.like = 1) - (SELECT COUNT(*) FROM rateComment WHERE rateComment.comment = c1.comment_id and rateComment.like = 0)) rate FROM comment c1) s1 where s1.post = c.post GROUP BY post))s2 GROUP BY post HAVING s2.rate > 0', (err, res) => {
            if (err) {
                reject(err)
            } else {
              
                resolve(res)
            }
        })
    })
}
/*
    Fonction pour savoir si l'id de l'auteur donne en parametres est le proprietaire du post donne en parametres  
*/
module.exports.isOwner = (userid,postid) =>{
    return new Promise((resolve,reject)=>{
       
        con.query('SELECT * from post where author=? and post_id=?', [userid,postid], (err, res) => {
            if (err) {
                reject(err)
            } else {
                
                resolve(res)
            }
        })
    })
}

/*
    Recupere un post par son id qui est donne en parametres
*/
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
/*
    Creer le post donne en parametres
*/
module.exports.create = (post) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO post (title,description,post_category,author,url_image,date,location,anonymous) VALUES (?,?,?,?,?,?,?,?);', [post.title, post.description, post.post_category, post.author, post.url_image, post.date,post.location,post.anonymous], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
/*
    Supprimer le post dont l'id est donne en parametres
*/
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
/*
    Modifie le post donne en parametres
*/
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
/*
    Met à jour l'url de l'image pour le post dont l'id est donne en parametres
*/
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
/*
    Met à jour si un post est valide ou non 
*/
module.exports.updateValidationByPostId = (id,value) => {
    return new Promise((resolve, reject) => {
        con.query('UPDATE post SET validate = ? where post_id=? ', [value,id], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}