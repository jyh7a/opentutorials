var mysql = require('mysql');

var db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
})
db.connect();

// 1개 API 꺼낸다
module.exports = db;

// 여러개 API 꺼낸다
// exports
