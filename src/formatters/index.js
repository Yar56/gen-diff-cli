import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import foramtJson from './json.js';

const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: foramtJson,
};
export default (diff, format) => formats[format](diff);
