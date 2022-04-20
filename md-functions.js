const fs = require('fs');
const path = require('path');
// const fetch = require('node-fetch');
// const readline = require('readline');



// const existPath = (route) => {
//     if (fs.existsSync(route)) {
//         console.log('The path exist!')
//         return true
//     } else {
//         console.log('The path does not exist!')
//         return false
//     }
// };


// if(fs.existsSync(path)){
//     console.log("El archivo EXISTE!");
//     }else{
//     console.log("El archivo NO EXISTE!");
//     }

// se verifica que la ruta sea absoluta, de lo contrario se convierte
const absolutePath = (route) => (path.isAbsolute(route) ? (route) : path.resolve(route))

// const absolutePath = (route) => {
//     if (path.isAbsolute(route)) {
//         console.log('The path is absolute')
//         return path.isAbsolute(route);
//     } else {
//         console.log('The path is relative, it will be converted to absolute')
//         path.resolve(route);
//         console.log('The path is absolute')
//         return path.resolve(route)
//     }
// };

// si la ruta es relativa se convierte a absoluta
// const convertPath = (route) => path.resolve(route);

// si la ruta es un directorio
const isDirectory = (route) => fs.statSync(route).isDirectory();

// se verifica la existencia de la ruta
// function existPath(route) {
//     return access(route, constants.R_OK);
//   };
const existPath = (route) => fs.existsSync(route);


// si la ruta es una carpeta
// function folderPath (route) {
//     try {
//         const stats = fs.statSync(route);//devuelve informacion sincronicamente sobre la ruta
//         return stats.isDirectory();
//     } catch (e) {
//         throw new Error('not a valid directory ' + route); 
//     }
// };

const readDir= (routeDir) => fs.readdirSync(routeDir);

// si la ruta es un archivo
// const isFile = (ruta) => fs.statSync(ruta).isFile();


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





// function readLink(route) {

//     // console.log('entrando a redlines', resp);
  
//     return readFile(route, 'utf8').then((result) => {
//       // console.log(resultado);
//       let regularExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;
//       // arrayLink = [...resultado.matchAll(regular)];
//       let arrayLink = result.match(regularExp);
  
//       // console.log('lo que resulta del array', arrayLink);
//       return arrayLink;
//     }).catch((err) => console.log("err", err))
//   }
  
// exports.absolutePath = absolutePath;
// exports.convertPath = convertPath;
// exports.existPath = existPath;
// exports.isFile = isFile;
// exports.readLink = readLink;

// extraer url

// const linksInfo = (file, files) => {
//     const line = file.toString().split('\n');  // separa el documento en líneas
//     let arrayLinks= []; 
//     for (let i=0; line.length > i; i++) {
//         const indexLine = line[i];
//         const reguExpress = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; //expresion regular para mostrar links y texto
//         const matchLinks = indexLine.matchAll(reguExpress);//retorna resultados de ocurrencia de expres regulares en un string
//         const testMatch = reguExpress.test(indexLine); // se verifica coincidencia entre expres regulares y linea
//         if (testMatch) {
//             for (const match of matchLinks) {
//                 const dataObj = {
//                     href: match[2],
//                     text: match[1],
//                     line: i + 1,
//                     file: files
//                 }
//             } arrayLinks.push(dataObj);
//         }
//     } return arrayLinks;
// };

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
