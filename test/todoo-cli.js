var path = require('path')
var fs = require('fs')
var _exec = require('child_process').exec
var assert = require('assert')
var async = require('async')
var output = require('../lib/output')

describe('todoo-cli', function(){

  before(function(){
    fs.renameSync(
      path.resolve(__dirname, '../bin/db.json'),
      path.resolve(__dirname, '../bin/db-copy.json')
    )
  })

  var cliFile = path.resolve(__dirname, '../bin/todoo-cli.js')

  it('#fetch', function(done){ // further test below
    fetch(function(e, list){
      assert.deepEqual(list, output([]))
      done()
    })
  })

  it('#add', function(done){
    async.series([
      add('Todo-1'),
      add('Todo-2'),
      add('Todo-3')
    ], function(e){
      fetch(function(e, list){
        assert.equal(list.length, 3)
        assert.equal(list[1].id, 2)
        assert.equal(list[1].title, 'Todo-2')

        var date = new Date(list[1].created_at)
        assert.ok(Date.now() - date.getTime() < 1000)
        done()
      })
    })

    function add(title){
      return function(next){
        exec(['add', title], next)
      }
    }
  })

  it('#remove', function(done){
    exec(['remove', '2'], function(e){
      fetch(function(e, list){
        assert.equal(list[1].id, 3)
        done()
      })
    })
  })

  it('#check', function(done){
    exec(['check', '3'], function(e){
      fetch(function(e, list){
        assert.equal(list[1].checked, true)
        done()
      })
    })
  })

  it('#uncheck', function(done){
    exec(['uncheck', '3'], function(e){
      fetch(function(e, list){
        assert.equal(list[1].checked, false)
        done()
      })
    })
  })

  after(function(){
    fs.renameSync(
      path.resolve(__dirname, '../bin/db-copy.json'),
      path.resolve(__dirname, '../bin/db.json')
    )
  })

  function fetch(callback){
    exec(['fetch'], function(e, stdout){
      var list = eval(stdout)
      callback(e, list)
    })
  }

  function exec(cmd, callback){
    _exec(['node', cliFile].concat(cmd).join(' '), callback)
  }

})
