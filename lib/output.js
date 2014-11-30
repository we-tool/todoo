var _ = require('lodash')

function output(list) {
  return _.map(list, function(item){
    var obj = _.clone(item)
    var date = new Date(item.created_at)
    item.created_at = formatDate(date)
    return obj
  })
}

function formatDate(date){
  return date.toJSON().replace(/T/, ' ')
    .replace(/\..+/, '')
}

module.exports = output
