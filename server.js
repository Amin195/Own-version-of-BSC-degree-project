// Importing express to this module and creating an app instance.
const express = require('express')
const app = express()

//Requiring bcrypt that will be used for hashing the passwords
const bcrypt = require('bcrypt')

// Requiring password login logic.
const beginPasswordAuth = require('./password-login')

//TODO Replace this users array with a connection to the database.
// Local variable to store users.
const users =[]

// Setting the rendering engine to ejs
app.set('view-engine', 'ejs')

// Use this to be able to access the values from the HTML login forms.
app.use(express.urlencoded({extended: false}))

// Handling GET requests coming to our app by serving from the root directory.
app.get('/', (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

// Adding a route to serve the login page.
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

// Adding a route to serve the login page.
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// Adding a new route from the login page to deal with incoming data.
app.post('/login', (req, res)=> {
    // TODO continue working on the password login logic
    if(req.body.email, ){

    }
})

// Adding a new route from the register page to deal with incoming data.
app.post('/register', async (req, res)=> {
    try {
        // Creating a hash out of the submitted password upon registering.
        // req.body.password is getting the body of the POST request the contains password input we then await hashing.
        // password is the name attribute in the HTML
        const hashedPassword = await bcrypt.hash (req.body.password, 10)
        // Adding the user to the users array. 
        // TODO replace this with adding user to DB. Also maybe add a user ID
        users.push({
            email: req.body.email,
            password: hashedPassword
        })
        // If the user was successful we redirect them to login using the response.
        res.redirect('/login')
    } catch {
        // If registration fails we send them back to the same registration page.
        res.redirect('/register')
    }
    // Check if user is created
    console.log(users)
})

// Express app listening on port 3000
app.listen(3000)