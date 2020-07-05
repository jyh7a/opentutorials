function Person(name = 'default', first = 0, second = 0, third = 0) {
  this.name = name;
  this.first = first;
  this.second = second;
  this.third = third;
}

Person.prototype.sum = function () {
  return `modified : ${this.first + this.second}`
};

let kim = new Person('kim', 10, 20)
kim.sum = function(){
  return `modified kim: ${this.first + this.second}`
}

let lee = new Person('lee', 10, 10)

console.log(`kim.sum():`, kim.sum());
console.log(`lee.sum():`, lee.sum());

