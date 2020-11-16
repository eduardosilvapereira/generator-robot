const path = require('path');

const fileSystemUtils = require("../../utils/fileSystem");

function generateFileName(name, extensionType) {
  const data = String(name);
  let payload = data;

  const matches = data.match(/[A-Z][a-z]+|[0-9]+/g)

  if (matches) {
    payload = matches.map((str) => str.toLowerCase()).join("-");
  }

  return `${payload}.${extensionType}`;
}

async function checkDirectoryExistenceAndCreate(directory) {
  const directoryExists = await fileSystemUtils.existsDirectory(directory);

  if (!directoryExists) {
    try {
      await fileSystemUtils.createDirectory(directory);
    } catch (e) {
      throw new Error(`> ERRO: Erro ao tentar criar diretório ${directory}`);
    }
  }
}

async function getContentOfFile(file) {
  try {
    const content = await fileSystemUtils.readFile(file);
    return content;
  } catch (error) {
    throw new Error(`> ERRO: Erro ao tentar ler o arquivo ${file}`);
  }
}

async function createFile(directory, fileName, content) {
  const output = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "generated-files",
    directory
  );

  await checkDirectoryExistenceAndCreate(output);
  await fileSystemUtils.createFile(path.join(output, fileName), content);
}

module.exports.generateFileName = generateFileName;
module.exports.checkDirectoryExistenceAndCreate = checkDirectoryExistenceAndCreate;
module.exports.getContentOfFile = getContentOfFile;
module.exports.createFile = createFile;

module.exports = {
  generateFileName,
  checkDirectoryExistenceAndCreate,
  getContentOfFile,
  createFile,
};
