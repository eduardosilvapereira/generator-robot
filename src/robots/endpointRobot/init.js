const path = require("path");

const state = require("../../state");

const {
  getContentOfFile,
  generateFileName,
  createFile,
} = require("../../helpers/fileHandler");
const replaceContentOfString = require("../../utils/replaceContentOfString");
const logger = require("../../helpers/logger");

let template = "";

function getNewContent(data, content) {
  const changeValues = {
    "{{ FUNCIONALIDADE }}": data.funcionalidade,
    "{{ URL_PLURAL }}": data.urlPlural,
    "{{ URL_SINGULAR }}": data.urlSingular,
  };

  return replaceContentOfString(content, changeValues);
}

async function generateEndpointContent(endpoint) {
  const contentOfTemplate = String(template);
  
  const content = getNewContent(endpoint, contentOfTemplate);
  
  return content;
}

async function generateEndpoints(endpoints) {
  let content = "";

  for (endpoint of endpoints) {
    const newContent = await generateEndpointContent(endpoint);

    content += newContent;
  }

  const fileName = generateFileName("endpoints", "ts");
  await createFile("endpoints", fileName, content);
}

async function init() {
  logger.info("[endpointsRobot] init...");
  
  const content = state.load();

  if (content.endpoints) {
    template = await getContentOfFile(path.join(__dirname, "template.txt"));
    await generateEndpoints(content.endpoints);
  }

  logger.info("[endpointsRobot] Done");
}

module.exports = init;
