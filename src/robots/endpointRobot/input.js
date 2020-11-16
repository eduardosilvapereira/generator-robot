const readlineSync = require("readline-sync");
const state = require("../../state");
const logger = require("../../helpers/logger");

async function input() {
  const content = state.load();
  
  logger.info("[endpointsRobot]");

  content.endpoints = askAndReturn();

  state.save(content);

  function askAndReturn() {
    if (readlineSync.keyInYN('Voce quer criar "endpoints"?')) {
      return askAndReturnEndpoints();
    } else {
      return null;
    }
  }

  function askAndReturnEndpoints() {
    const endpoints = [];

    let addAnother = true;

    while (addAnother) {
      const endpoint = askAndReturnEndpoint();
      
      endpoints.push(endpoint);
      
      addAnother = readlineSync.keyInYN('Deseja adicionar outro "endpoint"?');
    }

    return endpoints;
  }

  function askAndReturnEndpoint() {
    const endpoint = {};

    endpoint.funcionalidade = readlineSync.question("funcionalidade: ");
    endpoint.urlSingular = readlineSync.question("URL no Singular: ");
    endpoint.urlPlural = readlineSync.question("URL no Plural: ");

    return endpoint;
  }
}

module.exports = input;
