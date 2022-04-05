const express = require('express')
const app = express()

// Handling GET requests coming to our app by serving from the root directory.
app.get('/', (req, res) => {
    res.render('index.ejs')
})
// Express app listening on port 3000
app.listen(3000)