const  mysql = require('mysql')

const con = mysql.createConnection({ host: 'localhost', user: 'root', password: '0936954', database: 'snowbeez', port: 3306})

con.connect((err) => {
    if (err) console.log('bad luck - no connection' + err)
    else {
        console.log('db connected for CarsRus')
    }
})

module.exports = function getUserByEmail(email){
  con.query(`SELECT email FROM users WHERE users.email = ${email}`, function (err, results, fields) {
    if (err){
      console.log(err, 'something happened')
    } else {
      if(JSON.parse(results).email === email){
        console.log('Found user email in DB ', JSON.parse(results).email)
        return true
      } else {
        console.log('DID NOT Find user email in DB ', JSON.parse(results).email)
        return false
      }
      
    }
  })
}

