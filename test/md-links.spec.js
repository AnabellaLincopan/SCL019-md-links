const { mdLinks } = require('../lib/md-index.js');
const {
  isMdFile,
  isDirectory,
  existPath,
  getValidate,
  linkStats,
  readingFile,
} = require('../lib/md-functions');
const path = 'test/testfile.md';
const folder = 'test/tests-files';
const txtPath = '../txtfile.txt';
const nonExist = 'test/nonexist';

describe('isMdFile', () => {
  it('should be a function', () => {
    expect(typeof isMdFile).toBe('function');
  });
  it('should return true', () => {
    const result = isMdFile(path);
    expect(result).toBeTruthy();
  });
  it('should return false', () => {
    const result = isMdFile(txtPath);
    expect(result).toBeFalsy();
  });
});

describe('existPath', () => {
  it('should be a function', () => {
    expect(typeof existPath).toBe('function');
  });
  it('should return true', () => {
    const result = existPath(path);
    expect(result).toBeTruthy();
  });
  it('should return false', () => {
    const result = existPath(nonExist);
    expect(result).toBeFalsy();
  });
});

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
  });
});

describe('readingFile', () => {
  it('should be a function', () => {
    expect(typeof readingFile).toBe('function');
  });
  it('should return an array', () => {
    const result = readingFile(path);
    expect(result).toBeInstanceOf(Array);
  });
  it('should return correct path', () => {
    const result = ['test/testfile.md'];
    expect(readingFile(path)).toEqual(result);
  });
});

describe('linkStats', () => {
  it('should be a function', () => {
    expect(typeof linkStats).toBe('function');
  });
});

describe('getValidate', () => {
  it('should be a function', () => {
    expect(typeof getValidate).toBe('function');
  });
});

describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
});
