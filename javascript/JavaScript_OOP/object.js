let memberArray = ['egoing', 'graphittie', 'leezhece']

for(let i=0; i<memberArray.length; i++){
  console.log(`memberArray[${i}]: ${memberArray[i]}`)
}

let memberObject = {
  manager: 'egoing',
  developer: 'graphittie',
  designer: 'leezhce'
}

console.log('\n===================================================================================\n')

memberObject.designer = 'leezche1'

for(key in memberObject){
  console.log(`${key}: ${memberObject[key]}`)
}

delete memberObject.manager

console.log('\n===================================================================================\n')

for(key in memberObject){
  console.log(`${key}: ${memberObject[key]}`)
}