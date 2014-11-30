var _ = require('lodash')

function output(list) {
  return _.map(list, function(item){
    var obj = _.clone(item)
    var date = new Date(item.created_at)
    obj.created_at = formatDate(date)
    return obj
  })
}

function formatDate(date){
  // timezone stuff
  date = new Date(
    date.getTime() -
    1000 * 60 * date.getTimezoneOffset()
  )

  return date.toJSON().replace(/T/, ' ')
    .replace(/\..+/, '')
}

module.exports = output
