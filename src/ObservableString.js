'use strict';

var Observable = require('./Observable');
var isString = require('lodash.isstring');
var isUndefined = require('lodash.isundefined');

module.exports = ObservableString;

/**
 * @param {string} [value = '']
 * @constructor
 * @extends Observable
 */
function ObservableString(value) {
    Observable.apply(this, arguments);
    this.createProperty('value', isUndefined(value) ? '' : stringValidator(value), stringValidator);
}

function stringValidator(value) {
    if (!isString(value)) throw new TypeError('Value must be a string');
    return value;
}

ObservableString.prototype = Object.create(Observable.prototype);
