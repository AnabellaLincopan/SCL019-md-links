#!/usr/bin/env node
// const { options } = require('yuserarg');
// const { getStatus } = require('./lib/md-functions.js');
// const { getStatus } = require('./lib/md-functions.js');
const { mdLinks } = require ('./lib/md-index.js');
//  const yuserarg = require('yuserarg/yuserarg')
// const path = process.argv[2];
// // console.log(path) prueba.md
// const option = process.argv[3]; 
// -- validate or --stats


// const path = process.argv[2];
// const option = process.argv[3]; 

const userarg = process.argv;
const options = {}
if (userarg.some((x) => x === '--validate')) {
    options.validate = true;
  }
  if (userarg.some((x) => x === '--stats')) {
    options.showStats = true;
  }
  const path = userarg[0] === 'mdLink' ? userarg[1] : userarg[2];
  

// const option = yuserarg(process.argv.slice(2)).argv;
// console.log(path)


mdLinks(path, options).then((res) => {
    res.forEach(element => {
        const info = `Text: ${element.text}` + '\n' + `Href: ${element.href}` + '\n' + `Path: ${element.file}` + '\n';
        const statusLink = `Total links:  ${element.total}`.cyan + '\n' + `Unique links:  ${element.unique}`.cyan + '\n';
        const validateInfo = info + `Response status: ${element.status} ` + '\n' + `Link status: ${element.statusText}` + '\n';
        //const totalInfo = statusLink + '\n'+ info + `Response status: ${element.status} ` + '\n' + `Link status: ${element.statusText}` + '\n';
        // const statusAndValidate = statusLink + `Broken links:  ${element.broken}`.red + '\n' + `Valid links:  ${element.valid}`.green+ '\n';
        const statusAndValidate = statusLink + '\n' + validateInfo + '\n';
         if (options.validate && !options.showStats) {
             if (element.status === 404) {
                    console.log('\x1B[31m' + validateInfo + '\x1B[31m')
                } else if (element.status === 200) {
                    console.log('\x1b[32m' + validateInfo + '\x1b[0m');
                } else {
                    console.log('\x1B[35m' + validateInfo + '\x1B[35m')
                }
        } else if (!options.validate && options.showStats) {
            console.log(statusLink)
        }
        //  else if (options.validate && options.showStats) {
        //     console.log(statusAndValidate)
        // } 
    });
    console.log('Work done!'.blue)
    console.log('\n')
})
.catch((err) => {console.log(err)})


// mdLinks(path, option).then((results) => console.table(results));