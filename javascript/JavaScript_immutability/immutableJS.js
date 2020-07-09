const { Map, fromJS  } = require('immutable')
const o1 = fromJS ({name:'kim', score:[1,2]})
console.log(o1)
let o2 = o1.set('name', 'lee')
o2 = o2.updateIn(['score'], list => list.push(3))
console.log(o2)

