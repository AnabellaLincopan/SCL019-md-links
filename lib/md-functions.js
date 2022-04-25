const fs = require('fs');
const path = require('path');
const fetch = require('cross-fetch');
const colors = require('colors');
// const https = require('https');
// const url = require('url');
// const { mdLinks } = require('./md-index.js');
// const http = require("http");
// const https = require('https');

// const userPath = process.argv[2];
// se verifica que la ruta sea absoluta, de lo contrario se convierte
const absolutePath = (route) => path.isAbsolute(route) ? route : path.resolve(route);

// si la ruta es un directorio
const isDirectory = (route) => fs.statSync(route).isDirectory();

// se verifica la existencia de la ruta
// function existPath(route) {
//     return access(route, constants.R_OK);
//   };
const existPath = (route) => fs.existsSync(route);

// si la ruta es una carpeta

const readDir = (routeDir) => fs.readdirSync(routeDir);

// si la ruta es un archivo md
const isMdFile = (route) => {
  const extension = path.extname(route);
  if (extension === '.md') {
    return true;
  } else {
    console.log('Path is not a .md file'.red);
  }
}
// const isMdFile = (route) => (path.extname(route) === '.md');

// se lee el directorio
const readingFile = (thePath) => {
  const info = fs.statSync(thePath);
  let array = [];
  if (isDirectory(thePath)) {
    // si es carpeta
    const fileDir = readDir(thePath).map((file) => path.join(thePath, file)); // se lee el contenido del direc y se junta con el nombre del archivo
    console.log(fileDir);
    fileDir.forEach((file) => {
      if (fs.statSync(file).isFile()) {
        array.push(file); // se añade archivo al final del array
      } else {
        const repeat = readingFile(file);
        array = array.concat(repeat);
      }
    });
    // si es un archivo
  } else if (info.isFile()) {
    array.push(thePath.toString());
  } else {
    console.log('Undetermined path'.red);
  }
  const listArray = array.filter(isMdFile); // se crea nuevo array con los elementos md
  return listArray;

};

// extraer url
const linksInfo = (filesMd) => {
  let links = [];
  // if(matchLinks.length>0) {
  filesMd.forEach((files) => {
    const reguExpress =
      /\[(.+)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/gi; //expresion regular para mostrar links y texto
    const reguText = /\[([^\]]+)]/g;
    const reguUrl =
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
    const lineText = fs.readFileSync(files, { encoding: "utf8" });
    const matchLinks = lineText.match(reguExpress);
    // console.log(matchLinks)
    if (matchLinks !== null) {
    matchLinks.forEach((info) => {
      links.push({ 
        text: info.match(reguText) !== null ? info.match(reguText).toString().slice(1, -1): "Text not found",
        href: info.match(reguUrl).toString(),   
        file: files,
      });
    });
  } else {
    console.log('Couldn\'t find any link'.red);
  }
  });
// } else {
//   console.log('Couldn\'t find any link'.red);
// }
  return links;
};

//validate
const getValidate = (arrayLinks) => {
  const status = arrayLinks.map((obj) =>
    fetch(obj.href)
      .then((res) => {
        if (res.status === 200) {
          return {
            text: obj.text,
            href: obj.href,
            file: obj.file,
            status: res.status,
            statusText: 'Ok',
          };
        } else {
          return {
            text: obj.text,
            href: obj.href,
            file: obj.file,
            status: res.status,
            statusText: 'Fail',
          };
        }
      })
      .catch((err) => ({
          text: obj.text,
          href: obj.href,
          file: obj.file,
          status: 404,
          statusText: 'Fail',
      }))
  );
  return Promise.all(status);
};

const linkStats = (array, options, brokenLinks, redirectedLinks) => {
  const status = [];
  const linkTotal = array.length;
  const urls = array.map(element => element.href)
  const uniqueLinks = new Set(urls).size;

  const linkStats = { total: linkTotal, unique: uniqueLinks
    // , broken: failStats, valid: validStats
  };

  //  if ('stats validate') {
  //   if (!brokenLinks) {
  //     linkStats.broken = 0;
  //   } else {
  //     linkStats.broken = brokenLinks;
  //   }
  // //   if (!redirectedLinks) {
  // //     linkStats.redirected = 0;
  // //   } else {
  // //     linkStats.redirected = redirectedLinks;
  // //   // }
  //  }


  status.push(linkStats);

  return status;
};



module.exports = {
  isMdFile,
  isDirectory,
  existPath,
  absolutePath,
  readingFile,
  linksInfo,
  linkStats,
  getValidate,
};
