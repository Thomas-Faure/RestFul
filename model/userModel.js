const con = require("../config/db.js")
class User {
    constructor(user_id,username, firstname, lastname, birthday, mail, admin,sexe,password) {
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
      con.query('SELECT * FROM user where user_id=?',[id], (err, res) => {
          if (err) {
              reject(err)
          } else {
              console.log(res)
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



  

