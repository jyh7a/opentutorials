// 모듈 추출
const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')
const template = require('./lib/template')
const path = require('path')
const sanitizeHtml = require('sanitize-html')

// 서버생성
const app = http.createServer((req, res) => {
  let _url = req.url
  let queryData = url.parse(_url, true).query
  let pathname = url.parse(_url, true).pathname
  let title = queryData.id
  let filteredId = null;
  if(title) filteredId = path.parse(title).base

  console.log('url : ', url.parse(_url, true))

  if(pathname === '/'){
    if(title === undefined){
      fs.readdir('./data', (err, files) => {
        console.log(files)
        let title = 'Welcome'
        let description = 'Hello, Node.js'
        let list = template.list(files)
        let html= template.html(title, list,
          `<h2>${title}</h2><p>${description}</p>`,
          `<a href="/create">create</a>`)
        res.writeHead(200)
        res.end(html)
      })
    }else{
      fs.readdir('./data', (err, files) => {  
        console.log(files) 
        fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
          if(err) console.log(`err: ${err}`)
          const sanitizedTitle = sanitizeHtml(filteredId)
          const sanitizedDescription = sanitizeHtml(description, {
            allowedTags: ['h1']
          })
          let list = template.list(files) 
          let html= template.html(sanitizedTitle, list,
            `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
            `
            <a href="/create">create</a>
            <a href="/update?id=${sanitizedTitle}">update</a>
            <form name='delete' method='post' 
              onsubmit="const r = confirm('정말 삭제 하시겠습니까?'); 
              if(r){
                document.delete.action = 'delete_process';  
                document.delete.submit();
              }else{}"
            >
              <input type="hidden" name='id' value='${filteredId}'>
              <input type="submit" value='delete'>
            </form>`)
          res.writeHead(200)
          res.end(html)
        })
      })
    }
  }else if(pathname === '/create'){
    fs.readdir('./data', (err, files) => {
      console.log(files)
      let filteredId = 'WEB - create'
      let list = template.list(files)
      let html= template.html(filteredId, list, `
      <h1>${filteredId}</h1>
      <form action="/create_process" method="POST">
        <p><input type="text" name="title" placeholder="title"/></p>
        <p>
          <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
        </p>
        <p><input type="submit"></p>
      </form>`,
      `여긴 크리에이트 페이지야..`)

      res.writeHead(200)
      res.end(html)
    })
  }else if(pathname === '/create_process'){
    let body ='';
    req.on('data', (data) => body += data)
    req.on('end', () => {
      let post = qs.parse(body)
      let filteredId = post.title
      let description = post.description

      fs.writeFile(`data/${filteredId}`, description, 'utf8', (err) => {
        if(err) console.log(err)
        res.writeHead(302, {Location: `/?id=${filteredId}`})
        res.end()
      })
    })
  }else if(pathname === `/update`){
    fs.readdir('./data', (err, files) => {  
      console.log(files) 
      fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
        if(err) console.log(`err: ${err}`)
        let list = template.list(files)        
        let html= template.html(filteredId, list,
          `
          <form action="/update_process" method="POST">
            <input type="hidden" name="id" value="${filteredId}"/>
            <p><input type="text" name="title" placeholder="title" value="${filteredId}"/></p>
            <p>
              <textarea name="description" id="" cols="30" rows="10" placeholder="description">${description}</textarea>
            </p>
            <p><input type="submit"></p>
           </form>`,
          `<a href="/create">create</a> <a href="/update?id=${filteredId}">update</a>`)
        res.writeHead(200)
        res.end(html)
      })
    })
  }else if(pathname === `/update_process`){
    let body ='';
    req.on('data', (data) => body += data)
    req.on('end', () => {
      let post = qs.parse(body)
      let id = post.id
      let filteredId = post.title
      let description = post.description
      fs.rename(`data/${id}`, `data/${filteredId}`, (err) => {
        if(err) console.log(err)
        fs.writeFile(`data/${filteredId}`, description, 'utf8', (err) => {
          if(err) console.log(err)
          res.writeHead(302, {Location: `/?id=${filteredId}`})
          res.end()
        })
      })
    })
  }else if(pathname === `/delete_process`){
    let body ='';
    req.on('data', (data) => body += data)
    req.on('end', () => {
      let post = qs.parse(body)
      let id = post.id
      fs.unlink(`data/${id}`, (err) => {
        if(err) console.log(err)
        res.writeHead(302, {Location: `/`})
        res.end()
      })
    })
  }else{
    res.writeHead(404)
    res.end('Not Found')
  }
}).listen(3000)