const con = require("../config/db.js")
class User {
    constructor(user_id, username, firstname, lastname, birthday, mail, admin,sexe,password) {
        this.user_id = user_id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.mail = mail;
        this.admin = admin;
        this.sexe = sexe;
        this.password = password;  
    }
}
module.exports = User
module.exports.getAll = () => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM user', (err, results) => {
            var string=JSON.stringify(results);
            var json =  JSON.parse(string);
            if (err) {
                reject(err)
            } else {
                
                resolve(json)
            }
        })
    })
}
module.exports.create = (user) => {
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO user (firstname,lastname,username,mail,sexe,password,birthday,admin,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?);', [user.firstname,user.lastname,user.username,user.mail,user.sexe,user.password,user.birthday,user.admin,new Date().toISOString().slice(0, 19).replace('T', ' '),new Date().toISOString().slice(0, 19).replace('T', ' ')], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.delete = (user_Id) =>{
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM user WHERE user_id = ?', [user_Id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports.getUserById = (id) => {
  return new Promise((resolve, reject) =>{
      con.query('SELECT user_id, firstname, lastname, username, mail, sexe, birthday, admin FROM user where user_id=?',[id], (err, res) => {
          if (err) {
              reject(err)
          } else {
      
              resolve(res)
          }
      })
  })
}
module.exports.updatePassword = (password,user_id) =>{
    return new Promise((resolve, reject) => {
        con.query('UPDATE user SET  password = ? where user_id=?', [password,user_id], (err, res) => {
            if (err) {
                reject(err)
            } else {

                resolve(res)
            }
        })
    })
}
module.exports.getUserByUsername = (username) => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT user_id, firstname, lastname, username, mail, sexe, birthday, admin FROM user where username=?',[username], (err, res) => {
            if (err) {
                reject(err)
            } else {
        
                resolve(res)
            }
        })
    })
  }
module.exports.login = (username,password) => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM user where username=? and password=?',[username,password], (err, res) => {
            if (err || res.length == 0) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
  }


  module.exports.editUser = (user) => {

    
    if(user.password == undefined){
        return new Promise((resolve, reject) => {
            con.query('UPDATE user SET  firstname = ?, lastname = ?, username = ?, mail = ?, sexe = ?, birthday = ?, admin = ? where user_id=?', [user.firstname,user.lastname,user.username,user.mail,user.sexe,user.birthday,user.admin,user.user_id], (err, res) => {
                if (err) {
                    reject(err)
                } else {
    
                    resolve(res)
                }
            })
        })

    }else{
        return new Promise((resolve, reject) => {
            con.query('UPDATE user SET  firstname = ?, lastname = ?, username = ?, mail = ?, sexe = ?, password = ?, birthday = ?, admin = ? where user_id=?', [user.firstname,user.lastname,user.username,user.mail,user.sexe,user.password,user.birthday,user.admin,user.user_id], (err, res) => {
                if (err) {
                    reject(err)
                } else {
    
                    resolve(res)
                }
            })
        })
        
    }
    
}



  

