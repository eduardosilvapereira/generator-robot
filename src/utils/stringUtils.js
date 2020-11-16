const _ = require('lodash');

function camelCase (str) {
  return _.camelCase(str);
}

function pascalCase (str) {
  return _.startCase(_.camelCase(str)).replace(/ /g, '');
}

function snakeCase (str) {
  return _.snakeCase(str);
}

function kebabCase (str) {
  return _.kebabCase(str);
}

function startCase (str) {
  return _.startCase(str);
}

module.exports = {
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  startCase
};