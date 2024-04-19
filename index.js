// console.log("outside browser");

const fs = require('fs');
const os = require('os');

// sync way of reading file


// const data = fs.readFileSync('./abc.txt','utf-8');
// console.log(data);

// Async way of reading file

// const data = fs.readFile('./abc.txt','utf-8',(err,data)=>{
//     console.log(err);
//     console.log(data);
// });

// Writing and creating file


// fs.writeFileSync('./products.txt','Apple');
// fs.writeFile('./products.txt','mango',(err)=>{
//     console.log(err);
// });

// fs.appendFile('./products.txt','\nPineapple',(err)=>{
//     console.log(err);
// });

// fs.unlinkSync('abc.txt'); --- deleting files

console.log(os.platform());
console.log(os.hostname());
console.log(os.freemem());