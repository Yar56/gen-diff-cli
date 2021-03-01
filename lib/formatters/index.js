import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

// export default (diff, format) => {
//   switch (format) {
//     case 'plain':
//       return getPlainDiff(diff);
//     case 'stylish':
//       return getStylishDiff(diff);
//     default:
//       throw new Error('Error');
//   }
// };

const formats = {
  stylish,
  plain,
  json,
};
export default (diff, format) => formats[format](diff);
