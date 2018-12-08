const config = require('../../config')

const Queue = require('bull')
const { sendMessage } = require('../utils/mailer')

const emailQueue = new Queue('sendEmail', config.redis)

emailQueue.process(async (job, done) => {
  console.log(`Sending confirmation email: ${job.data.message.to}`)
  await sendMessage(job.data.message)
  console.log(`Message successfully sent to ${job.data.message.to}!`)
  done()
})

console.log('Worker Initialized')
console.log(`Email Host: ${config.nodemailer.host}`)
