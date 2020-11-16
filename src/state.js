const fs = require("fs");
const path = require("path");

const contentFilePath = path.join(__dirname, "..", "content.json");
const scriptFilePath = path.join(
  __dirname,
  "..",
  "content",
  "after-effects-script.js"
);

function save(content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(contentFilePath, contentString);
}

function saveScript(content) {
  const contentString = JSON.stringify(content);
  const scriptString = `var content = ${contentString}`;
  return fs.writeFileSync(scriptFilePath, scriptString);
}

function load() {
  let contentJson = {};

  try {
    const fileBuffer = fs.readFileSync(contentFilePath, "utf-8");
    contentJson = JSON.parse(fileBuffer);
  } catch(e) {
    save(contentJson);
  }
  
  return contentJson;
}

module.exports = {
  save,
  saveScript,
  load,
};
