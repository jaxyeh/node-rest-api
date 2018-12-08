const config = require('../../config')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(config.mailer, {
  from: config.emailFrom
})

module.exports.sendMessage = async (message) => {
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error occurred')
      console.log(error.message)
    }
    console.log('Message sent successfully!')
    console.log(nodemailer.getTestMessageUrl(info))
    // only needed when using pooled connections
    // transporter.close()
  })
}
