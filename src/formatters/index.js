import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formats = {
  stylish,
  plain,
  json,
};
export default (diff, format) => formats[format](diff);
