'use strict';

var Observable = require('./Observable');

module.exports = ObservableValue;

/**
 * @param {*} [initialValue]
 * @constructor
 * @extends Observable
 */
function ObservableValue(initialValue) {
    Observable.apply(this, arguments);
    this.createProperty('value', initialValue);
}

ObservableValue.prototype = Object.create(Observable.prototype);
