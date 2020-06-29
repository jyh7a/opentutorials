// 모듈 추출
const http = require('http')
const fs = require('fs')
const url = require('url')

// 서버생성
const app = http.createServer((req, res) => {
  let _url = req.url
  let queryData = url.parse(_url, true).query
  let pathname = url.parse(_url, true).pathname
  let title = queryData.id

  console.log(url.parse(_url, true))

  if(pathname === '/'){
    fs.readFile(`data/${title}`, 'utf8', (err, description) => {
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
        <p>${description}</p>
      </body>
      </html>
    `
    res.writeHead(200)
    res.end(template)
    })
  }else{
    res.writeHead(404)
    res.end('Not Found')
  }
  

  
  
}).listen(3000)