const con = require("../config/db.js")
module.exports.getAll = () => {
    return new Promise((resolve, reject) =>{
        con.query('SELECT * FROM user', (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log(res)
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
            
                console.log("false")
                resolve(false)
            } else {
                console.log("true")
                resolve(true)
            }
        })
    })
  }



  

