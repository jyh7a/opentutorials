var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  // user     : 'nodejs',
  user     : 'root',
  password : '123456',
  database : 'opentutorials'
});
 
connection.connect();
 
connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) throw error;
  // console.log('fields is :', fields);
  console.log('');
  console.log('The solution is: ', results);
  console.log('');
  console.log('results[0] ', results[0]);
});
 
connection.end();