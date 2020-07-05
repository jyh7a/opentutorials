let kim = {
  name: 'kim',
  first: 10,
  second: 20,
  sum: function(){
    return this.first + this.second 
  }
}

let j = kim

console.log(j)
console.log(`j == kim: ${Boolean(j==kim)}`)
kim.name = 'young'
console.log(kim)
console.log(j)

// console.log(kim.sum(kim.first, kim.second))
console.log(kim.sum())
