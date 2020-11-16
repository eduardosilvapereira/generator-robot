const path = require("path");
const { kebabCase, startCase, pascalCase } = require("../../utils/stringUtils");

const state = require("../../state");

const {
  getContentOfFile,
  generateFileName,
  createFile,
} = require("../../helpers/fileHandler");
const replaceContentOfString = require("../../utils/replaceContentOfString");
const logger = require("../../helpers/logger");

const templates = {
  cadastroHtml: "",
  cadastroTs: "",
  listaTs: ""
};

async function generateCadastroHtml(crud) {
  const changeValuesOfContent = {
    "{{ FIELDS }}": ""
  };

  const contentOfTemplate = String(templates.cadastroHtml);
  const content = replaceContentOfString(contentOfTemplate, changeValuesOfContent);

  const name = kebabCase(crud.nomeSingular);

  const fileName = `cadastro-${name}.component.html`;
  await createFile(path.join("components", name, `cadastro-${name}`), fileName, content);
}

async function generateCadastroTs(crud) {
  const name = kebabCase(crud.nomeSingular);
  
  const changeValuesOfContent = {
    "{{ NAME }}": pascalCase(crud.nomeSingular),
    "{{ NAME_FOR_FILE }}": name,
    "{{ TITLE }}": startCase(crud.tituloSingular),
    "{{ FUNCTIONALITIES }}": crud.funcionalidade,
    "{{ ENDPOINT }}": crud.endpoint,
    "{{ ACTIONS }}": crud.acoes.split(',').map(acao => (`'${acao}'`)).join(',')
  };

  const contentOfTemplate = String(templates.cadastroTs);
  const content = replaceContentOfString(contentOfTemplate, changeValuesOfContent);

  const fileName = `cadastro-${name}.component.ts`;
  await createFile(path.join("components", name, `cadastro-${name}`), fileName, content);
}

async function generateListaTs(crud) {
  const name = kebabCase(crud.nomeSingular);
  const namePlural = kebabCase(crud.nomePlural);
  
  const changeValuesOfContent = {
    "{{ NAME }}": pascalCase(crud.nomeSingular),
    "{{ NAME_PLURAL }}": pascalCase(crud.nomePlural),
    "{{ NAME_FOR_FILE }}": name,
    "{{ NAME_PLURAL_FOR_FILE }}": namePlural,
    "{{ TITLE_PLURAL }}": startCase(crud.tituloPlural),
    "{{ FUNCTIONALITIES }}": crud.funcionalidade,
    "{{ ENDPOINT }}": crud.endpoint,
    "{{ ACTIONS }}": crud.acoes.split(',').map(acao => (`'${acao}'`)).join(',')
  };

  const contentOfTemplate = String(templates.listaTs);
  const content = replaceContentOfString(contentOfTemplate, changeValuesOfContent);

  const fileName = `lista-${namePlural}.component.ts`;
  await createFile(path.join("components", name, `lista-${namePlural}`), fileName, content);
}

async function generateCrud(crud) {
  await generateCadastroHtml(crud);
  await generateCadastroTs(crud);
  await generateListaTs(crud);
}

async function generateCruds(cruds) {
  for (crud of cruds) {
    await generateCrud(crud);
  }
}

async function init() {
  logger.info("[crudRobot] init...");
  
  const content = state.load();

  if (content.cruds) {
    templates.cadastroHtml = await getContentOfFile(path.join(__dirname, "templates", "cadastro.html.txt"));
    templates.cadastroTs = await getContentOfFile(path.join(__dirname, "templates", "cadastro.ts.txt"));
    templates.listaTs = await getContentOfFile(path.join(__dirname, "templates", "lista.ts.txt"));
    
    await generateCruds(content.cruds);
  }

  logger.info("[crudRobot] Done");
}

module.exports = init;
