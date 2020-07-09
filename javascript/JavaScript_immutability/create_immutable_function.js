// function fn(person){
//   person = Object.assign({}, person)
//   person.name = 'lee'
//   return person
// }

// let o1 = {name: 'kim'}
// let o2 = fn(o1)
// console.log(o1, o2, o1 === o2)

function fn(person){
  person.name = 'lee'
}

let o1 = {name: 'kim'}
let o2 = Object.assign({}, o1)
fn(o2)
console.log(o1, o2, o1 === o2)