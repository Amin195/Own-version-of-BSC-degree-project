const bcrypt = require('bcrypt')
//const mysql = require('./db-manager')
const  mysql = require('mysql')

const con = mysql.createConnection({ host: 'localhost', user: 'root1', password: '0936954', database: 'snowbeez', port: 3306})

con.connect((err) => {
    if (err) console.log('bad luck - no connection' + err)
    else {
        console.log('db connected')
    }
})

exports.passwordAuth = (req, res) => {
    console.log(req.body)
    const email = req.body.email
    con.query(`SELECT email FROM users WHERE users.email = ?`, [email], async (err, results, fields) => {
        if (err){
          console.log(err, 'something happened ERROR')
        } 
        
          if(results.length > 0){
            console.log('Found user email in DB ', results[0].email)
            return res.redirect('/')
          } else {
            console.log('DID NOT Find user email in DB ')
            return res.render('./login.ejs')
          }
      })
}

async function startPasswordAuth(email, enteredHashedPass) {
    // Check if email is registered
   if (mysql.getUserByEmail(email)) {
        // If user is registered check passwords and return boolean and a message maybe by returning a function.
        console.log('FOUND IT!')
        return true
    } else {
        console.log('DID NOT FOUND IT!')
        return false
    }
    
}
// This probably be returned to the server.js and contains status of the authentication and a message.
function done(success, { }) {

}

// This function will check the database for the passwords and see if they match.
async function passwordMatch(enteredHashedPass) {
    const storedPassword = null // Get it from Database
    if (await bcrypt.compare(storedPassword, enteredHashedPass)) {
        return true
    }

}
