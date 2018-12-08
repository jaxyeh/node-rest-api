
const path = require('path')
require('dotenv').config({ silent: true, path: path.join(__dirname, '..', '.env') })

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env

module.exports = {
  host: SMTP_HOST,
  port: SMTP_PORT || 587,
  secure: (SMTP_SECURE === 'true'), // true for 465, false for other ports
  auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
  }
};
