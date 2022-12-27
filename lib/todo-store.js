var FileSync = require('lowdb/adapters/FileSync')
var low = require('lowdb')
var _ = require('lodash')

function TodoStore(dbFile){
  var adapter = new FileSync(dbFile)
  var db = low(adapter)
  db.defaults({ meta: [], items: [] }).write()

  if (db.get('meta').isEmpty().value()) { // setup meta
    db.get('meta').push({ next_id: 1 }).write()
  }
  this.meta = db.get('meta').first().value()

  this.items = db.get('items')
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
  this.items.push(item).write()
  return item
}

TodoStore.prototype.update = function update(sel, diff){
  this.items.filter(sel).each(function(item){
    _.assign(item, diff)
  }).write()
}

TodoStore.prototype.remove = function remove(sel){
  this.items.remove(sel).write()
}

module.exports = TodoStore
