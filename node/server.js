let fsPromise = require('./fsPromise')

let {readFile,mkdir,writeFile,appendFile,copyFile,readdir,huwei} = fsPromise

// readFile('fsPromise.js').then(res=>{
//     console.log(res)
// })
// readdir('./css').then(res=>{
//   return (typeof res)
// }).then(res=>{
//   console.log(res)
// });
console.log(fsPromise)