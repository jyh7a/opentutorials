const http = require('http')
const cookie = require('cookie')

http.createServer((req, res) => {
  let cookies = {}
  if(req.headers.cookie !== undefined){
    cookies = cookie.parse(req.headers.cookie);
  }
  console.log(cookies);
  console.log(cookies.yummy_cookie);
  console.log(cookies.tasty_cookie);

  res.writeHead(200,{
    'Set-Cookie': [
      'yummy_cookie = choco',
      'tasty_cookie = strawberry',
      `Permanet = cookies; Max-Age = ${60*60*24*30}`
    ]
  })
  res.end('Cookie!!')
}).listen(3000) 