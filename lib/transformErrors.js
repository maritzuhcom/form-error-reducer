const { Map, Set } = require('immutable');

/**
 * transdforms errors into a flat structure or preserves structure but flattens
 * error arrays
 * @param  {Object}  formData              Form object
 * @param  {Boolean} [useFirstKey=false]   Flag for preserve structure
 * @return {Map}                           ImmutableJS Map
 */
const transformErrors = (formData, useFirstKey = false) => {
  const map = new Map()

  // TODO fill it

  return map;
}

const flattenArray = (arr = []) => {
  if (!arr.length) {
    throw new Error('Cannot reduce an empty array');
  }

  const set = new Set(arr);
  return `${set.join('. ')}.`;
}

const collectStrArrs = () => {

}



module.exports = {
  transformErrors,
  flattenArray,
  collectStrArrs
}
