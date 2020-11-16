const readlineSync = require("readline-sync");
const state = require("../../state");

const logger = require("../../helpers/logger");

async function input() {
  const content = state.load();
  
  logger.info("[crudRobot]");

  content.cruds = askAndReturn();

  state.save(content);

  function askAndReturn() {
    if (readlineSync.keyInYN('Voce quer criar um CRUD básico?')) {
      return askAndReturnCruds();
    } else {
      return null;
    }
  }

  function askAndReturnCruds() {
    const cruds = [];

    let addAnother = true;

    while (addAnother) {
      const crud = askAndReturnCrud();
      
      cruds.push(crud);
      
      addAnother = readlineSync.keyInYN('Deseja adicionar outro "crud"?');
    }

    return cruds;
  }

  function askAndReturnCrud() {
    const crud = {};

    crud.nomeSingular = readlineSync.question("Nome no Singular: ");
    crud.nomePlural = readlineSync.question("Nome no Plural: ");

    crud.tituloSingular = readlineSync.question("Titulo no Singular: ");
    crud.tituloPlural = readlineSync.question("Titulo no Plural: ");
    
    crud.funcionalidade = readlineSync.question("Funcionalidade: ");
    crud.endpoint = readlineSync.question("Endpoint: ");
    crud.acoes = readlineSync.question("Acoes: ");

    return crud;
  }
}

module.exports = input;
