const db = require('./db-manager')

exports.fingerprintAuth = (req, res) => {
    console.log('The fingerprint collected: ', req.body.fingerprintJS)
}