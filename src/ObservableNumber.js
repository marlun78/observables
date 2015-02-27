'use strict';

var Observable = require('./Observable');
var isNumber = require('lodash.isnumber');
var isUndefined = require('lodash.isundefined');

module.exports = ObservableNumber;

/**
 * @param {number} [initialValue]
 * @constructor
 * @extends Observable
 */
function ObservableNumber(initialValue) {
    Observable.apply(this, arguments);
    this.createProperty('value', isUndefined(initialValue) ? 0 : numberValidator(initialValue), numberValidator);
}

function numberValidator(value) {
    if (!isNumber(value)) throw new TypeError('Value must be a number');
    return value;
}

ObservableNumber.prototype = Object.create(Observable.prototype);
