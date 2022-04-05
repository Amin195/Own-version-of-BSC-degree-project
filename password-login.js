const bcrypt = require('bcrypt')
const mysql = require('./db-manager')
function startPasswordAuth(email, enteredHashedPass){
    // Check if email is registered
    if(mysql.getUserByEmail(email)) {
        // If user is registered check passwords and return boolean and a message maybe by returning a function.
        console.log('FOUND IT!')
        return true
    }
}
// This probably be returned to the server.js and contains status of the authentication and a message.
function done(success, {}){

}

// This function will check the database for the passwords and see if they match.
async function passwordMatch(enteredHashedPass){
    const storedPassword = null // Get it from Database
    if (await bcrypt.compare(storedPassword, enteredHashedPass)){
        return true
    }
    
}

module.exports = startPasswordAuth