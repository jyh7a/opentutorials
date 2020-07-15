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
  console.log('test')

  res.writeHead(200,{
    'Set-Cookie': [
      'yummy_cookie=choco',
      'tasty_cookie=strawberry',
      // `Permanet = cookies; Max-Age = ${60*60*24*30}; Secure`,
      `Permanet=cookies; Max-Age = ${60*60*24*30};`,
      `Secure=Secure; Secure`,
      `HttpOnly=HttpOnly; HttpOnly`,
      `Path=Path; Path=/cookie`,
      `Domain=Domain; Domain=jyh7a.com`
    ] 
  })
  res.end('Cookie!!')
}).listen(3000) 