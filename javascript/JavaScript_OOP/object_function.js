let kim = { name: 'kim', first:10, second: 20 }
let lee = { name: 'lee', first:10, second: 10 }

function sum(prefix){
  // this = kim
  return prefix + (this.first + this.second)
}

// call
// sum();
console.log('sum.call(kim)', sum.call(kim,'=> ')) // apply
console.log('sum.call(lee)', sum.call(lee, ': '))

// bind
let kimSum = sum.bind(kim, '-> ')
console.log('kimSum', kimSum())