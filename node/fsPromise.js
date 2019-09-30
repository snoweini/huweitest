let fs = require('fs'); 
let path = require('path');


['mkdir','rmdir','readdir','unlink','readFile','writeFile','appendFile','copyFile'].forEach(item=>{
    exports[item] = function(...arg){
      let args =[];
      let [pathName] = arg;
      pathName = path.resolve(path.resolve(),pathName);
      return new Promise((resolve,reject)=>{
         args = [
                   (err,result)=>{
                     if(err){
                        reject(err)
                        return
                     }
                     resolve(result||'')
                   }
            ];
          if(item==='readFile'||item==='copyFile'){
            args.unshift('utf8')
          } 
          if(item==='writeFile'||item==='appendFile'){
            let [p,data] = arg
            args.unshift('utf8')
            args.unshift(data)

          }
          if(item==='copyFile'){
            let [p,curl] = arg
            curl = path.resolve(path.resolve(),curl)
            args.unshift(curl)
          }
         fs[item](pathName,...args)
      })

    }
})



// let readFile = function(pathName){
//     pathName = path.resolve(path.resolve(),pathName);
//     return new Promise((resolve,reject)=>{
//        fs.readFile(pathName,'utf8',function(err,result){
//           if(err){
//              reject(err)
//              return
//           }
//           resolve(result)
//        })
//     })
// }
// module.exports = {
//     readFile
// }
//创建文件夹
/*fs.mkdir('./css',function(err){
    if(err){
      console.log(err);
      return false;
    }
    console.log('创建成功')
})*/
//删除文件夹
/*fs.rmdir('./css',function(err){
   if(err){
     console.log(err)
     return 
   }
   console.log('删除成功')
})*/
//读取文件
/*fs.readFile('./1.txt','utf-8',function(err,reslut){
  if(err){
    console.log(err)
    return
  }
  console.log(reslut)
})*/
//写入文件
/*fs.writeFile('./1.txt','node.js','utf-8',function(err){
   if(err){
      console.log(err)
      return
   }
   console.log('写入成功')
})*/
//追加文件
/*fs.appendFile('./1.txt','hello,world','utf-8',function(err){
   if(err){
     console.log(err)
     return 
   }
   console.log('追加成功')
})*/
//删除文件
/*fs.unlink('./1.txt',function(err){
   if(err){
     console.log(err)
     return 
   }
   console.log('删除文件成功')
})*/
//copy文件
/*fs.copyFile('./1.txt','./2.txt',function(err){
   if(err){
     console.log(err)
     return
   }
   console.log('复制成功')
})*/










