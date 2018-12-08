const config = require('../../config')
const differenceInSeconds = require('date-fns/difference_in_seconds')

const expired = (date) => {
  const seconds = differenceInSeconds(new Date(), date)
  return seconds >= config.confirmTimeout
}

module.exports = {
  expired
}
