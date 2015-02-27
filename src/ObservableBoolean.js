'use strict';

var Observable = require('./Observable');
var isBoolean = require('lodash.isboolean');

module.exports = ObservableBoolean;

/**
 * @param {boolean} initialValue
 * @constructor
 * @extends Observable
 */
function ObservableBoolean(initialValue) {
    Observable.apply(this, arguments);
    this.createProperty('value', booleanValidator(initialValue), booleanValidator);
}

function booleanValidator(value) {
    if (!isBoolean(value)) throw new TypeError('Value must be a boolean');
    return value;
}

ObservableBoolean.prototype = Object.create(Observable.prototype);
