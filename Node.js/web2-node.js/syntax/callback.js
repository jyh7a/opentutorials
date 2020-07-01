// function a(){
//   console.log('A')
// }

const a = () => {
  console.log('A')
}

const slowfunc = (callback) => {
  console.log('slowFunc');
  callback()
}

slowfunc(a)