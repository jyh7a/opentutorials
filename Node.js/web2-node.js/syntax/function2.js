const { setupMaster } = require("cluster")

console.log(Math.round(1.6)) // 2
console.log(Math.round(1.4)) // 1

const sum = (num1, num2) => { // parameter 매개변수
  console.log(num1 + num2)
}

sum(12, 4); // argument 인자

