var TodoStore = require('../lib/todo-store')
var path = require('path')
var fs = require('fs')
var assert = require('assert')

var dbFile = path.resolve(__dirname, 'db.json')
try {
  fs.unlinkSync(dbFile)
} catch(e) {}
var todoStore = new TodoStore(dbFile)

describe('todo-store', function(){

  it('#fetch', function(){
    assert.deepEqual(todoStore.fetch(), [])
  })

  it('#add', function(){
    todoStore.add({ a: 1 })
    todoStore.add({ a: 2 })
    todoStore.add({ a: 1 })
    assert.equal(todoStore.fetch().length, 3)
  })

  it('#update', function(){
    todoStore.update({ a: 1 }, { a: 99 })
    assert.equal(todoStore.fetch({ a: 99 }).length, 2)
  })

  it('#remove', function(){
    todoStore.remove({ a: 99 })
    assert.equal(todoStore.fetch().length, 1)
  })

})
