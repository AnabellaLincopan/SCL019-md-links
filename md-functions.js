const fs = require('fs');
const path = require('path');
// const fetch = require('node-fetch');
// const readline = require('readline');

// se verifica que la ruta sea absoluta, de lo contrario se convierte
const absolutePath = (route) => (path.isAbsolute(route) ? (route) : path.resolve(route))

// si la ruta es un directorio
const isDirectory = (route) => fs.statSync(route).isDirectory();

// se verifica la existencia de la ruta
// function existPath(route) {
//     return access(route, constants.R_OK);
//   };
const existPath = (route) => fs.existsSync(route);


// si la ruta es una carpeta

const readDir= (routeDir) => fs.readdirSync(routeDir);


// si la ruta es un archivo md 
function isMdFile (route) {
    const extension = path.extname(route);
    if(extension === '.md') {
        return true;
    } else {
        console.log('Path is not a .md file')
    }
}
// const isMdFile = (route) => (path.extname(route) === '.md');

// se lee el directorio
const readingFile = (thePath) => {
    const info = fs.statSync(thePath);
    let array = [];
    if(isDirectory(thePath)) { // si es carpeta
        const fileDir = readDir(thePath).map(file => path.join(thePath, file)) // se lee el contenido del direc y se junta con el nombre del archivo
        console.log(fileDir);
        fileDir.forEach((file) => {
            if (fs.statSync(file).isFile()) {
                array.push(file); // se añade archivo al final del array
            } else {
                const repeat = readingFile(file);
                array = array.concat(repeat);
            }
        })
        // si es un archivo
    } else if (info.isFile()) {
        array.push(thePath.toString());
    } else {
        console.log('Undetermined path')
    }
    const listArray = array.filter(isMdFile) // se crea nuevo array con los elementos md
    return listArray;
}

// // en caso de que la ruta sea una carpeta se recorre y se lee
// const readFolderPath = (thePath, linksMd) => {
//     const folderFile = fs.readdirSync(thePath);
//     folderFile.forEach(file => {
//         const fullPath = path.join(thePath, file);
//         if (folderPath(fullPath)) {
//             readFolderPath(fullPath, linksMd);
//         } else if (isMdFile(fullPath)) {
//             readFile(fullPath, linksMd);
//         }
//     });
// };


// extraer url
const linksInfo = (filesMd) => {
    let links = [];
    filesMd.forEach((files) => {
        const reguExpress = /\[(.+)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig; //expresion regular para mostrar links y texto  
        const reguText = /\[([^\]]+)]/g;
        const reguUrl = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
        const lineText = fs.readFileSync(files, {encoding: 'utf8'})
        const matchLinks = lineText.match(reguExpress);
        matchLinks.forEach((info) => {
            links.push({
                'text': (info.match(reguText)!==null) ? info.match(reguText).toString().slice(1,-1) : "Text not found",
                'href': info.match(reguUrl).toString(),
                'file': files
            })
        })
    })
    return links
};

module.exports = {
    existPath,
    absolutePath,
    readingFile,
    linksInfo,
  };
