# todoo

Mark your todo list

## Usage

As lib module:

```js
var TodoStore = require('todoo')
var store = new TodoStore('./todos.json')
store.add({
  title: 'Go to bed',
  catagory: 'Health'
})
var item = store.fetch({
  catagory: 'Health'
})
store.update({
  catagory: 'Health'
}, {
  checked: true
})
```

- fetch(sel)
- add(data)
- remove(sel)
- update(sel, diff)

As Cli tool:

```
$ todoo fetch
>>> [ { id: 1,
    title: 'Hello',
    checked: false,
    created_at: 1417279244824 },
  { id: 2,
    title: 'Hello1',
    checked: false,
    created_at: 1417279253891 } ]
$ todoo remove 2
$ todoo checked 1
$ todoo add "Go to bed"
```

- fetch
- add [title]
- remove [id]
- check [id]
- uncheck [id]
