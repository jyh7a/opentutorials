// 모듈 추출
const http = require('http')
const fs = require('fs')

// 서버생성
const app = http.createServer((req, res) => {
  let url = req.url;

  if(req.url == '/'){ url = '/index.html' }
  else if(req.url == '/favicon.ico'){ return res.writeHead(404) }

  res.writeHead(200);
  console.log(__dirname + url)
  res.end(fs.readFileSync(__dirname + url))
  
}).listen(3000);