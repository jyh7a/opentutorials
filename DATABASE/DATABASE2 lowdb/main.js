const shortid = require('shortid');
const low = require('lowdb')
// 파일 동기 방식으로 저장
const FileASync = require('lowdb/adapters/FileASync')
// json 형식으로 저장
const adapter = new FileASync('db.json')
low(adapter).then(
  function(db){
   // Set some defaults (required if your JSON file is empty)
    db.defaults({ topic: [], author: []})
      .write()

    // // db.get('author') === db.json.author
    // db.get('author').push({
    //   id: 1,
    //   name: 'egoing',
    //   profile: 'developer'
    // }).write()

    // // db.get('topic') === db.json.topic
    // db.get('topic').push({
    //   id: 1,
    //   title: 'lowdb',
    //   description: 'lowdb is ...',
    //   created: '2018-01-30',
    //   author: 1
    // }).write()

    // db.get('topic').push({
    //   id: 2,
    //   title: 'mysql',
    //   description: 'mysql is ...',
    //   created: '2018-02-20',
    //   author: 1
    // }).write()

    // // GET
    // console.log(db.get('topic').value())
    // console.log('find id:1',db.get('topic').find({id: 1}).value())
    // console.log('find title:"mysql"',db.get('topic').find({title:"mysql", author:1}).value())

    // // UPDATE
    // db.get('topic')
    //   .find({id:2})
    //   .assign({description: 'MySQL & MariaDB'})
    //   .write()

    // DELETE
    // db.get('topic')
    //   .remove({ id: 2 })
    //   .write()

    // put taeho data
    var sid = shortid.generate()
    db.get('author').push({
      id: sid,
      name: 'duru',
      profile: 'db admin'
    }).write().then(function(){
      console.log('add author')
    })

    db.get('topic').push({
      id: shortid.generate(),
      title: 'MSSQL',
      dscription: 'MSSQL is ...',
      created: "2018-03-21",
      author: sid
    }).write().then(function(){
      console.log('add topic')
    })
  }
)



