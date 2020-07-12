const fs = require('fs')

// readFileSync
console.log('A')
let result = fs.readFileSync('syntax/sample.txt', 'utf8')
console.log(result)
console.log('C')

console.log('=================================================================')

// readFile
console.log('A')
fs.readFile('syntax/sample.txt', 'utf8', (err, data) => {
  console.log(data)
})
console.log('C') 