const functionMd = require('./md-functions.js');
const fs = require('fs');
// let colors = require('colors');
// let arrayMDLinks = [];

const mdLinks = (path, options) => {
   return new Promise ((resolve, reject) => {
        const absolute = functionMd.absolutePath(path);
        // console.log(absolute)
        // console.log(functionMd.absolutePath(path))
        // console.log(path)
        // console.log(functionMd.existPath(absolute))
        if (functionMd.existPath(absolute)) {
            console.log('Reading path...');
            const saveFiles = functionMd.readingFile(absolute);
            // console.log(saveFiles)
            const saveInfo = functionMd.linksInfo(saveFiles);
            console.log(saveInfo)
            if (options === '--validate') {
                resolve(saveInfo)
            }
        } else {
            reject ('Invalid path');
        }
    })
};


module.exports = { mdLinks };

