const { mdLinks } = require ('../lib/md-index.js');
const { isMdFile, isDirectory, existPath, getValidate, readingFile, linksInfo } = require ('../lib/md-functions');
// const { array, describe } = require('yargs');
const path = 'test/testfile.md';
const folder = 'test/tests-files'
const txtPath = '../txtfile.txt';
const nonExist = 'test/nonexist'
const option = '--validate';
const stats = '--stats'


// se verifica que archivo sea md
describe('isMdFile', () => {
  it('should be a function', () => {
    expect (typeof isMdFile).toBe('function');
  });
  it('should return true', () => {
    const result = isMdFile(path);
    expect(result).toBeTruthy();
  })
  it('should return false', () => {
    const result = isMdFile(txtPath);
    expect (result).toBeFalsy();
  })
});

// se testea que la ruta exista
describe('existPath', () => {
  it('should be a function', () => {
    expect (typeof existPath).toBe('function');
  });
  it('should return true', () => {
    const result = existPath(path);
    expect(result).toBeTruthy();
  })
  it('should return false', () => {
    const result = existPath(nonExist);
    expect (result).toBeFalsy();
  })
});


// se testea que sea un directorio
describe('isDirectory', () => {
  it('should be a function', () => {
      expect(typeof isDirectory).toBe('function');
  });

  it('should return true', () => {
      const result = isDirectory(folder);
      expect(result).toBeTruthy();
  });
  it('should return false', () => {
    const result = isDirectory(path);
    expect(result).toBeFalsy();
})
});

// se testea readingFile
describe("readingFile", () => {
  it("should be a function", () => {
    expect(typeof readingFile).toBe("function");
  });
  it("should return an array", () => {
    const result = readingFile(path);
    expect(result).toBeInstanceOf(Array);
  });
  it("debería retornar un arreglo de objetos", () => {
      const result = [
        'test/testfile.md'
      ];
      expect(readingFile(path)).toEqual(result);
   });
});

// se testea getValidate
describe('getValidate', () => {
  it('should be a function', () => {
    expect(typeof getValidate).toBe('function');
 });
//  it("should return a promise", () => {
//   const result = getValidate(path);
//   expect(result).toBeInstanceOf(Array);
// });
});

// se testea que mdLinks sea una promesa y stats
describe('mdLinks', () => {
  // it('it should be a promise', () => {
  //   // expect(typeof mdLinks).toBe('');
  //   // expect(typeof mdLinks).toBe('function')
  //   expect(!!mdLinks && typeof mdLinks.then === 'function').toBe(true);
  // })
  it("should return an array", () => {
    return mdLinks(path, option).then(res => {
      expect(res).toBeInstanceOf(Array);
    });
  })
  it("it should return 2 links", () => {
    return mdLinks(path, stats).then(res => {
      const result = 'Total links found: 2'.cyan;
      expect(res).toEqual(result);
  })
   });
  //  it('tests error with rejects', () => {
  //   return mdLinks(path, '--otro').then(res => {
  //     const result = 'Invalid path'
  //   expect(res).rejects.toEqual(result)
  //   });
  // });
});

