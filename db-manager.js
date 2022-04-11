const  mysql = require('mysql')

module.exports = mysql.createConnection({ host: 'localhost', user: 'root1', password: '0936954', database: 'snowbeez', port: 3306})
const con = 

con.connect((err) => {
    if (err) console.log('bad luck - no connection' + err)
    else {
        console.log('db connected')
    }
})
