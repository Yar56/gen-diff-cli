import yaml from 'js-yaml';

const map = {
  json: JSON.parse,
  yml: yaml.load,
};

export default (fileData, dataType) => map[dataType](fileData);
