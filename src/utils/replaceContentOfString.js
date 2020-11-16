function replaceContentOfString(content, contentReplace) {
  let newContent = content;

  Object.keys(contentReplace).forEach((key) => {
    const regex = new RegExp(key, "g");
    newContent = newContent.replace(regex, contentReplace[key]);
  });

  return newContent;
}

module.exports = replaceContentOfString;
