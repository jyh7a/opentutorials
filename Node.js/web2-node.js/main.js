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

  console.log('url : ', url.parse(_url, true))

  if(pathname === '/'){
    if(title === undefined){
      fs.readdir('./data', (err, files) => {
        console.log(files)
        let title = 'Welcome'
        let description = 'Hello, Node.js'

        let list = `<ul>`
        for(var i=0; i<files.length; i++){
          list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
        }
        list += `</ul>`

        let template = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8" /> 
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body> 
        </html>`
        res.writeHead(200)
        res.end(template)
      })
    }else{
      fs.readdir('./data', (err, files) => {
        console.log(files)

        let list = `<ul>`
        for(var i=0; i<files.length; i++){
          list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
        }
        list += `</ul>`

        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
          if(err) console.log(`err: ${err}`)
      
          let template = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8" />
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
        `
        res.writeHead(200)
        res.end(template)
        })
      })
    }
  }else{
    res.writeHead(404)
    res.end('Not Found')
  }
  

  
  
}).listen(3000)