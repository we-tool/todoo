#!/usr/bin/env node
var minimist = require('minimist')
var path = require('path')
var TodoStore = require('../lib/todo-store')
var output = require('../lib/output')

var todoStore = new TodoStore(
  path.resolve(__dirname, './db.json')
)
run(minimist(process.argv.slice(2)))

function run(args){

  if (args._[0] === 'fetch') { // fetch

    var list = todoStore.fetch()
    console.log(output(list))

  } else if (args._[0] === 'add') { // add [title]

    var data = {
      title: args._[1]
    }
    todoStore.add(data)

  } else if (args._[0] === 'remove') { // remove [id]

    todoStore.remove({
      id: parseInt(args._[1])
    })

  } else if (args._[0] === 'check') { // check [id]

    todoStore.update({
      id: parseInt(args._[1])
    }, {
      checked: true
    })

  } else if (args._[0] === 'uncheck') { // uncheck [id]

    todoStore.update({
      id: parseInt(args._[1])
    }, {
      checked: false
    })

  }

}
