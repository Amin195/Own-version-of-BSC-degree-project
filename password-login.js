const bcrypt = require('bcrypt')
function startPasswordAuth(email, enteredHashedPass){
    // Check if email is registered
    if(getUserByEmail(email)){
        // If user is registered check passwords and return boolean and a message maybe by returning a function.
        if(passwordMatch(enteredHashedPass)){
            return 
        }
    }
}
// This probably be returned to the server.js and contains status of the authentication and a message.
function done(success, {}){

}

// This function will check the dataBase for the users email and compare it with what they entered.
function getUserByEmail(email) {
    return true
}

// This function will check the database for the passwords and see if they match.
async function passwordMatch(enteredHashedPass){
    const storedPassword = null // Get it from Database
    if (await bcrypt.compare(storedPassword, enteredHashedPass)){
        return true
    }
    
}

module.exports = startPasswordAuth