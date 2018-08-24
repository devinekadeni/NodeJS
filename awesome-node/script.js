const fs = require('fs'); //file system , allow access file system

//READ    = read file
fs.readFile('./hello.txt', (err, data) => {
  console.time('start');
  if (err) {
    console.log('error');
  }
  // console.log(data.toString());
  const temp = data.toString();
  let floor = 0;
  for(let i = 0; i<temp.length; i++) {
    if(temp[i] === '(') {
      floor += 1;
    }else {
      floor -= 1;
    }
  }
  console.log(floor);
  console.timeEnd('start');
  console.log('coba 1')
  console.log('hai')
})

// const file = fs.readFileSync('./hello.txt');  // sync = synchronous
// console.log(file.toString());

// //APPEND    = edit file
// fs.appendFile('./hello.txt', ' This is so cool!', err => {
//   if(err) {
//     console.log(err);
//   }
// })

// //WRITE   = create new file
// // fs.writeFile('bye.txt', 'sad to see you go', err => {
// //   if(err) {
// //     console.log(err);
// //   }
// // })

// //DELETE
// fs.unlink('./bye.txt', err => {
//   if(err) {
//     console.log(err);
//   }
//   console.log('Inception');
// })