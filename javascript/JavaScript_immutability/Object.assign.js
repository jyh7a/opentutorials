// let o1 = {name:'kim'}
// console.log(o1)

// let o2 = o1
// o2.name = 'lee'
// console.log(o1, o2, o1 === o2)

let o1 = {name:'kim'}
let o2 = Object.assign({}, o1)
o2.name = 'lee'
console.log(o1, o2, o1 === o2)