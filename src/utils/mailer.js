const config = require('../../config')
const nodemailer = require('nodemailer')
const differenceInSeconds = require('date-fns/difference_in_seconds')

const transporter = nodemailer.createTransport(config.nodemailer, {
  from: config.emailFrom
})

const sendMessage = (message) => {
  return transporter.sendMail(message)
}

const confirmationExpired = (date) => {
  const seconds = differenceInSeconds(new Date(), date)
  return seconds >= config.emailConfirmationTimeout
}

module.exports = {
  sendMessage,
  confirmationExpired
}
