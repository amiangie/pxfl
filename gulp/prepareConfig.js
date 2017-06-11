var path = require('path');

function prepareConfig(config) {
  
  var src = config.src;
  src.templatesBuild[0] = path.join(src.base, src.templatesBuild[0]);
  src.templatesWatch[0] = path.join(src.base, src.templatesWatch[0]);
  src.templatesWatch[1] = path.join(src.base, src.templatesWatch[1]);
  return config;
}

module.exports = prepareConfig;
