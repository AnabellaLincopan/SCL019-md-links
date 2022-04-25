const functionMd = require('./md-functions.js');
// const fs = require('fs');
// let colors = require('colors');
// let arrayMDLinks = [];

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // let totalMdLinks = [];
    const absolute = functionMd.absolutePath(path);
    if (functionMd.existPath(absolute)) {
      console.log('\n')
      const saveFiles = functionMd.readingFile(absolute);
      // console.log(saveFiles)
      const saveInfo = functionMd.linksInfo(saveFiles);
      const status = functionMd.linkStats(saveInfo);
      const valid = functionMd.getValidate(saveInfo);
      // const totalInfo = status +  valid;
      if (options.validate && !options.showStats) {
        resolve(valid)
      } 
      else if (!options.validate && options.showStats) {
        resolve(status);
      }
      // //  else if (options.validate && options.showStats) {
      // //   resolve(status)
      // // }
      else {
        console.log('Enter an option:'.blue + '\n' + '--validate' + '\n' + '--stats' + '\n');
      }
    } else {
      reject(new Error('Invalid path'));
    }
  })
};

module.exports = { mdLinks };
