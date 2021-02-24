import getStylishDiff from './stylish.js';
import getPlainDiff from './plain.js';

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
  stylish: getStylishDiff,
  plain: getPlainDiff,
};
export default (diff, format) => formats[format](diff);
