// 모듈 추출
const http = require('http')
const fs = require('fs')
const url = require('url')

// 서버생성
const app = http.createServer((req, res) => {
  let _url = req.url;
  console.log(_url);
  let queryData = url.parse(_url, true).query;
  let title = queryData.id
  
  if(_url == '/') title = 'Welcome' 
  else if(_url == '/favicon.ico') return res.writeHead(404) 

  res.writeHead(200);
  fs.readFile(`data/${title}`, 'utf8', (err, data) => {
    if(err) console.log(err)

    let template = `
    <!DOCTYPE html>
    <html>

    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8" />
    </head>

    <body>
      <h1><a href="/">WEB</a></h1>

      <ul>
        <li><a href="1.html?id=HTML">HTML</a></li>
        <li><a href="2.html?id=CSS">CSS</a></li>
        <li><a href="3.html?id=JavaScript">JavaScript</a></li>
      </ul>

      <h2>${title}</h2>

      <p>
        ${data}
      </p>
    </body>
    </html>
  `
  res.end(template)
  })
  
  
}).listen(3000);