let members = ['egoing', 'k8805', 'hoya']
let i = 0;

while(i < members.length){
console.log(`array loop: ${members[i]}`);
  i++;
}


var roles = {
  'programmer':'egoing',
  'designer':'k8805',
  'manager':'hoya',
}

for(var name in roles){
  // console.log(name)
  console.log(`object loop: ${roles[name]}`)

}