const fs = require('fs');
const path = require('path');
const fetch = require('cross-fetch');
const colors = require('colors');

const absolutePath = (route) =>
  path.isAbsolute(route) ? route : path.resolve(route);

const isDirectory = (route) => fs.statSync(route).isDirectory();

const existPath = (route) => fs.existsSync(route);

const readDir = (routeDir) => fs.readdirSync(routeDir);

const isMdFile = (route) => {
  const extension = path.extname(route);
  if (extension === '.md') {
    return true;
  } else {
    console.log('Path is not a .md file'.red);
  }
};

const readingFile = (thePath) => {
  const info = fs.statSync(thePath);
  let array = [];
  if (isDirectory(thePath)) {
    const fileDir = readDir(thePath).map((file) => path.join(thePath, file));
    fileDir.forEach((file) => {
      if (fs.statSync(file).isFile()) {
        array.push(file);
      } else {
        const repeat = readingFile(file);
        array = array.concat(repeat);
      }
    });
  } else if (info.isFile()) {
    array.push(thePath.toString());
  } else {
    console.log('Undetermined path'.red);
  }
  const listArray = array.filter(isMdFile);
  return listArray;
};

const linksInfo = (filesMd) => {
  let links = [];
  filesMd.forEach((files) => {
    const reguExpress =
      /\[(.+)\]\((https?:\/\/[^\s]+)(?: '(.+)')?\)|(https?:\/\/[^\s]+)/gi;
    const reguText = /\[([^\]]+)]/g;
    const reguUrl =
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
    const lineText = fs.readFileSync(files, { encoding: 'utf8' });
    const matchLinks = lineText.match(reguExpress);
    if (matchLinks !== null) {
      matchLinks.forEach((info) => {
        links.push({
          text: info.match(reguText) !== null ? info.match(reguText).toString().slice(1, -1) : 'Text not found',
          href: info.match(reguUrl).toString(),
          file: files,
        });
      });
    } else {
      console.log('Couldn\t find any link'.red);
    }
  });
  return links;

};

const getValidate = (arrayLinks) => {
  const status = arrayLinks.map((obj) =>
    fetch(obj.href)
      .then((res) => {
        if (res.status <= 399) {
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
        statusText: 'Fail, not found',
      }))
  );
  return Promise.all(status);
};

const linkStats = (array) => {
  const status = [];
  const linkTotal = array.length;
  const urls = array.map((element) => element.href);
  const uniqueLinks = new Set(urls).size;

  const linkStats = { total: linkTotal, unique: uniqueLinks };

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
