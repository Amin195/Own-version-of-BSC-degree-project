const bcrypt = require('bcrypt')
//const mysql = require('./db-manager')
const mysql = require('mysql')

// Import the module responsible for sending emails
const secondChannel = require('./second-channel')

const con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'AJnuHA^8VKHht=uB', database: 'snowbeez', port: 3306 })

let fp = null
let gp = null
let sweetWordOne = null
let sweetWordTwo = null
let email = null

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
    //console.log('this is the response: \n', req)
    console.log(req.body)
    email = req.body.email
    const password = req.body.password
    con.query(`SELECT * FROM users WHERE users.email = ?`, [email], async (err, results, fields) => {
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
                            sweetWordOne = results[i].sweetWordOne
                            sweetWordTwo = results[i].sweetWordTwo
                            return res.redirect('/graphical')
                        }
                    }

                    secondChannel.sendEmail('djsparten117@gmail.com', 'You have received this email because you recently tried logging in to your sonwbeeZ account but your device/browser have changed')
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

exports.graphicalAuth = async (req, res) => {
    temp = req.body.paswordNumbers
    temp2 = ""
    temp.forEach(element => {
        temp2 += element
    });
    gp = temp2
    //console.log('returning graphicalAuth', req.body.paswordNumbers)
    console.log('graphicalCheckDB userGp:', gp)
    console.log('sweetword1:', sweetWordOne)
    console.log('sweetword2:', sweetWordTwo)
    let sweetword = null 
    if (await bcrypt.compare(gp, sweetWordOne)) {
        console.log('mattching sweetword one!!!')
        sweetword = 'sweetWordOne'
    }else if(await bcrypt.compare(gp, sweetWordTwo)){
        console.log('mattching sweetword Two!!!')
        sweetword = 'sweetWordTwo'
    }else{
        console.log('No Matching sweewords')
    }
    // try{
        con.query(`SELECT * FROM honeychecker WHERE honeychecker.user = ?`, [email], async (err, results) => {
            if (err) {
                console.log(err, 'something happened in graphical checking ERROR')
            }
            if (results.length > 0) {
                console.log(results)
                console.log('SW: ', results[0].correctSW)
                if(results[0].correctSW === sweetword){
                    console.log('screaming found')
                    //log in here
                    return res.redirect('/')
                }else{
                    console.log('from DB: ', results[0].correctSW, 'From here', sweetword)
                    console.log('no results found for that user?')
                    //honeytoken alert
                    return res.redirect('./login')
                }
            }else {
                //incorrect GP
                console.log('DID NOT Find any Results in DB GP')
                //return res.render('./login.ejs', { messages: 'Invalid email' })
            }
        })
    // }catch (e){
    //     console.log(e)
    //     return res.status(500).send('an Error happened when checking graphical hashes')
    // }

    //res.status(200)
}

// async function graphicalCheckDB(userGp){
    
// }

