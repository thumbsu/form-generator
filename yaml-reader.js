const yaml = require('js-yaml');
const fs = require('fs');
const Handlebars = require('handlebars');

exports.yamlToJson = function (fileName) {
  try {
    return yaml.load(fs.readFileSync(`${fileName}.yaml`, 'utf8'));
  } catch (e) {
    return e
  }
}

exports.generate = function (filters) {
  Handlebars.registerHelper('isTextType', function (value) {
    return value === "text";
  });
  Handlebars.registerHelper('isSelectType', function (value) {
    return value === "select";
  });
  const template = Handlebars.compile(fs.readFileSync("filter.handlebars", 'utf8'));
  fs.writeFileSync('filter.js', template({ ...filters }))
}
