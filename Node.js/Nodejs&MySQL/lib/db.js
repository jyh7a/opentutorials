var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'opentutorials',
  // multipleStatements: true
})
db.connect();

// 1개 API 꺼낸다
module.exports = db;

// 여러개 API 꺼낸다
// exports
