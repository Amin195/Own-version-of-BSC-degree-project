const  mysql = require('mysql')

const con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'AJnuHA^8VKHht=uB', database: 'snowbeez', port: 3306})

con.connect((err) => {
    if (err) console.log('bad luck - no connection' + err)
    else {
        console.log('db connected')
    }
})
function getUserByEmail(email){
  con.query(`SELECT email FROM users WHERE users.email = ?`, [email], async (err, results, fields) => {
    if (err){
      console.log(err, 'something happened')
      return false
    } 
    
      if(results && results.length>0){
        console.log('Found user email in DB ', results[0].email)
        return true
      } else {
        console.log('DID NOT Find user email in DB ')
        return false
      }
  })
}

module.exports = {getUserByEmail}