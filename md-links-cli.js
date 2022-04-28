#!/usr/bin/env node
const { mdLinks } = require ('./lib/md-index.js');

console.log('\n' + '-------- Welcome to AntvMdLinks🌞 --------'.cyan)

const userarg = process.argv;
const options = {}
if (userarg.some((x) => x === '--validate')) {
    options.validate = true;
}
if (userarg.some((x) => x === '--stats')) {
    options.showStats = true;
};

const path = userarg[2];

mdLinks(path, options).then((res) => {
    res.forEach(element => {
        const info = `Text: ${element.text}` + '\n' + `Href: ${element.href}` + '\n' + `Path: ${element.file}` + '\n';
        const statusLink = `Total links: ${element.total}`.cyan + '\n' + `Unique links: ${element.unique}`.cyan + '\n';
        const validateInfo = info + `Response status: ${element.status}` + '\n' + `Link status: ${element.statusText}` + '\n';
         if (options.validate && !options.showStats) {
             if (element.status >= 400) {
                    console.log('\x1B[31m' + validateInfo + '\x1B[31m')
                }
                else {
                    console.log('\x1b[32m' + validateInfo + '\x1b[0m')
                }
        } else if (!options.validate && options.showStats) {
            console.log(statusLink)
        }
    });
    console.log('Work done! ✔️'.blue)
    console.log('\n')
})
.catch((err) => {console.log(err)})
