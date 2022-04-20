#!/usr/bin/env node
const { mdLinks } = require ('./md-index.js');
// const path = process.argv[2];
// // console.log(path) prueba.md
// const option = process.argv[3]; 
// -- validate or --stats
const path = process.argv[2];
console.log(path)

// const option = process.argv[3]; 
const option = {};


// if (showPath[0] === 'mdLinks') {
//     path = showPath[1];
//   } else {
//     path = showPath[2];
//   }

// mdLinks(path, options).then(() =>{
    
// }).catch((err)=>{
//   console.log(err);
// });

mdLinks(path, option).then((res) => {
    console.log(res)
})
.catch((err) => {console.log(err)})


