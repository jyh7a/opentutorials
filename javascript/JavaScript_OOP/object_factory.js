function Person(name = 'default', first = 0, second = 0, third = 0) {
  this.name = name;
  this.first = first;
  this.second = second;
  this.third = third;
  this.sum = function () {
    return this.first + this.second + this.third;
  };
}
let kim = new Person('kim', 10, 20, 30)
let lee = new Person('lee', 10, 10, 10)

console.log(`kim.sum(): ${kim.sum()}`);
console.log(`lee.sum(): ${lee.sum()}`);

// let d1 = new Date("2019-4-10");
// console.log(`d1: ${d1}`);
// console.log(`d1.getfullYear(): ${d1.getFullYear()}`);
// console.log(`d1.getMonth(): ${d1.getMonth()}`);



console.log(`Person(): ${Person()}`)
// construcotr
console.log(`new Person(): ${new Person()}`)
console.log(`new Person():`, new Person())
