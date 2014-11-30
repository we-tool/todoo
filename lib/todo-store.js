var low = require('lowdb')
var _ = require('lodash')

function TodoStore(dbFile){
  var db = low(dbFile)
  if (db('meta').isEmpty().value()) { // setup meta
    db('meta').push({ next_id: 1 })
  }
  this.meta = db('meta').first().value()

  this.items = db('items')
  this.db = db
}

TodoStore.prototype.fetch = function fetch(sel){
  return this.items.filter(sel).value()
}

TodoStore.prototype.add = function add(data){
  var nextId = this.meta.next_id++
  var item = _.assign({
    id: nextId,
    checked: false,
    created_at: Date.now()
  }, data)
  this.items.push(item)
  return item
}

TodoStore.prototype.update = function update(sel, diff){
  this.items.filter(sel).each(function(item){
    _.assign(item, diff)
  })
  this.db.save() // manually called
}

TodoStore.prototype.remove = function remove(sel){
  this.items.remove(sel)
}

module.exports = TodoStore
