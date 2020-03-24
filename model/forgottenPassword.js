const con = require("../config/db.js")
class ForgottenPassword{
    constructor(id,token,user_id) {
        this.id=id
        this.token=token
        this.user_id=user_id
    }
}
module.exports = ForgottenPassword
module.exports.getTokenByUser = (user_id)=>{
    return new Promise((resolve, reject) => {
        con.query('select f.token from forgottenPassword f where f.user_id = ?',[user_id],(err, res) => {
            if (err) {
                reject(err)
            } else {
               
                resolve(res)
            }
        })
    })

}
module.exports.getUserByToken = (token)=>{
    return new Promise((resolve, reject) => {
        con.query('select f.user_id from forgottenPassword f where f.token = ?',[token],(err, res) => {
            if (err) {
                reject(err)
            } else {
               
                resolve(res)
            }
        })
    })

}

module.exports.exists = (user_id,token)=>{
    return new Promise((resolve, reject) => {
        con.query('select * from forgottenPassword f where f.user_id=? and f.token = ?',[user_id,token],(err, res) => {
            if (err) {
                reject(err)
            } else {
               
                resolve(res)
            }
        })
    })

}

module.exports.create = (forgotten) => {
   
    return new Promise(function (resolve, reject) {
        con.query('INSERT INTO forgottenPassword (user_id,token) VALUES (?,?);', [forgotten.user_id,forgotten.token], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

module.exports.delete = (user_id) =>{
    return new Promise(function (resolve, reject) {
        con.query('DELETE FROM forgottenPassword WHERE user_id = ?', [user_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}




module.exports.update = (user_id,token) => {
    return new Promise((resolve, reject) => {
        con.query('UPDATE forgottenPassword SET token = ? where user_id=? ', [token,user_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
            
                resolve(res)
            }
        })
    })
}
