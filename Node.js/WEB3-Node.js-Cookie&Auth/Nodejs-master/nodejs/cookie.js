const http = require('http')

http.createServer((req, res) => {
  console.log(req.headers.cookie);
  res.writeHead(200,{
    'Set-Cookie': ['yummy_cookie=choco', 'tasty_cookie=strawberry']
  })
  res.end('Cookie!!')
}).listen(3000) 