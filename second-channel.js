const nodemailer = require('nodemailer')

// If we face trouble using GMAIL we should check here for fixes https://nodemailer.com/usage/using-gmail/

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'snowbeez.2fa@gmail.com',
    pass: 'snowbeeZ1234'
  }
})

exports.sendEmail = (receiver, message) => {
  const mailOptions = {
    from: 'snowbeez.2fa@gmail.com',
    to: receiver,
    subject: 'New authentication attempt to your snowbeeZ account',
    text: message
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
