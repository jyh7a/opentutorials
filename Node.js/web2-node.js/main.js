// 모듈 추출
const http = require('http')
const fs = require('fs')
const url = require('url')

// 서버생성
const app = http.createServer((req, res) => {
  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  console.log(queryData)

  if(_url == '/'){ _url = '/index.html' }
  else if(_url == '/favicon.ico'){ return res.writeHead(404) }
  

  res.writeHead(200);
  console.log(__dirname + _url)
  // res.end(fs.readFileSync(__dirname + _url))
  
}).listen(3000);