const bcrypt = require('bcrypt')
// const mysql = require('./db-manager')
const mysql = require('mysql')

// Import the module responsible for sending emails
const secondChannel = require('./second-channel')

const con = mysql.createConnection({ host: 'localhost', user: 'root1', password: '0936954', database: 'snowbeez', port: 3306 })

let fp = null

const messages = {
  invalidEmail: 'Invalid email'

}
con.connect((err) => {
  if (err) console.log('bad luck - no connection' + err)
  else {
    console.log('db connected')
  }
})

exports.passwordAuth = (req, res) => {
  // console.log('this is the response: \n', req)
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  con.query('SELECT * FROM users WHERE users.email = ?', [email], async (err, results, fields) => {
    if (err) {
      console.log(err, 'something happened ERROR')
    }

    if (results.length > 0) {
      console.log('These are the results from the DB ', results)
      console.log('Found user email in DB ', results[0].email)
      try {
        // Check if passwords match.
        if (await bcrypt.compare(password, results[0].pass)) {
          // Check if the fingerprint in the database matches the collected one.
          for (let i = 0; i < results.length; i++) {
            if (results[i].dbFingerprint === fp) {
              // Call for graphical..
              return res.redirect('/')
            }
          }

          secondChannel.sendEmail('amin.marteni@gmail.com', 'You have received this email because you recently tried logging in to your sonwbeeZ account but your device/browser have changed')
          return res.render('./login.ejs', { messages: 'Fingerprints do not match' })
        } else {
          return res.render('./login.ejs', { messages: 'Wrong password' })
        }
      } catch (e) {
        console.log(e)
        return res.status(500).send('an Error happened when checking password hashes')
      }
    } else {
      console.log('DID NOT Find user email in DB ')
      return res.render('./login.ejs', { messages: 'Invalid email' })
    }
  })
}

exports.fingerprintAuth = (req, res) => {
  fp = req.body.fingerprintJS
  console.log('The fingerprint collected: ', fp)
  res.status(200)
}
