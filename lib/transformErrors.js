const Utils = require('./Utils');
const { Map, List, fromJS } = require('immutable');

/**
 * transdforms errors into a flat structure or preserves structure but flattens
 * error arrays
 * @param  {Object}  formData              Form object
 * @param  {List}    preserveDeepKeys      keys to keep deep structure of
 * @return {Map}                           ImmutableJS Map
 */
const transformErrors = (formData, preserveDeepKeys = new List()) => formData.map((value, key) => {
  if (preserveDeepKeys.includes(key)) {
    return Utils.replaceMessages(value);
  }

  return Utils.getReadableStr(
    Utils.getMessages(value).toArray()
  );
});

module.exports = transformErrors;
