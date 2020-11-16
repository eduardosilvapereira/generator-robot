const fs = require("fs");

async function existsDirectory(path) {
  return new Promise((resolve) => {
    fs.exists(path, (exists) => {
      resolve(exists);
    });
  });
}

async function createDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}

async function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (error, content) => {
      if (error) {
        return reject(error);
      }

      return resolve(content);
    });
  });
}

async function createFile(file, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, "utf8", (error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
}

module.exports.existsDirectory = existsDirectory;
module.exports.createDirectory = createDirectory;
module.exports.readFile = readFile;
module.exports.createFile = createFile;

module.exports = {
  existsDirectory,
  createDirectory,
  readFile,
  createFile,
};
