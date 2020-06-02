const isArray = require('lodash/isArray');
const isString = require('lodash/isString');
const isPlainObject = require('lodash/isPlainObject');
const isNumber = require('lodash/isNumber');
const isBoolean = require('lodash/isBoolean');
const keys = require('lodash/keys');

function flattenError(el) {
  if (isString(el) || isNumber(el)) {
    return el;
  }

  if (isArray(el)) {
    return el.reduce((agg, e) => (agg === '' ? flattenError(e) : `${agg} ${flattenError(e)}`), '');
  }

  if (isPlainObject(el)) {
    return keys(el).reduce((agg, k) => (agg === '' ? `${k} ${flattenError(el[k])}` : `${agg}. ${k} ${flattenError(el[k])}`), '');
  }

  if (isBoolean(el)) {
    if (!el) {
      return 'false';
    }
  }

  return '';
}

module.exports = function handleError(error) {
  if (error instanceof Error) {
    return error.toString();
  }
  return flattenError(error);
}