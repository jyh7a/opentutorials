console.group('A')
console.log(`Math.PI: ${Math.PI}`)
console.log(`Math.random(): ${Math.random()}`)
console.log(`Math.floor(3.9): ${Math.floor(3.9)}`)
console.log(`Math.ceil(3.2): ${Math.ceil(3.2)}`)
console.log(`Math.round(3.5): ${Math.round(3.5)}`)
console.log(`Math.round(3.4): ${Math.round(3.4)}`)
console.groupEnd('A')

let MyMath = {
  PI: Math.PI,
  random: function(){
    return Math.random()
  },
  floor: function(val){
    return Math.floor(val)
  }
}

console.log(`MyMath.PI: ${MyMath.PI}`)
console.log(`MyMath.random(): ${MyMath.random()}`)
console.log(`MyMath.floor(3.9): ${MyMath.floor(3.9)}`)