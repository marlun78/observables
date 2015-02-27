'use strict';

var isArray = require('lodash.isarray');
var isFunction = require('lodash.isfunction');
var isString = require('lodash.isstring');
var isUndefined = require('lodash.isundefined');

var ERR_FUNCTION = 'Observer must be a function';
var ERR_PROPERTY_NAME = 'Observer property name must be a non-empty string';

module.exports = Observable;

/**
 * @constructor
 */
function Observable() {
    this.$$observers = [];
}

Observable.prototype = {
    constructor: Observable,
    createProperty: createProperty,
    observe: observe,
    unobserve: unobserve
};


/**
 * @public
 * @this {Observable}
 * @param {string} name
 * @param {*} [value] - Initial value if any
 * @param {function} [validator]
 * @returns {Observable}
 */
function createProperty(name, value, validator) {
    var privateValue = value,
        self = this;
    if (!isString(name) || name.length < 1) {
        throw new TypeError(ERR_PROPERTY_NAME);
    }
    if (!isFunction(validator)) validator = noValidation;
    Object.defineProperty(self, name, {
        get: function () {
            return privateValue;
        },
        set: function (value) {
            var oldValue = privateValue,
                newValue = validator(value, oldValue);
            if (newValue !== oldValue) {
                privateValue = newValue;
                notify.call(self, name, newValue, oldValue);
            }
        }
    });
    return this;
}


/**
 * @public
 * @this {Observable}
 * @param {function|string} name
 * @param {function} [observer]
 * @returns {Observable}
 */
function observe(name, observer) {
    var observers;
    //if (isFunction(name) && isUndefined(observer)) {
    //    observer = name;
    //    name = null;
    //    this.$$observers.push(observer);
    //} else {
    if (!isString(name) || name.length < 1) {
        throw new TypeError(ERR_PROPERTY_NAME);
    }
    if (!isFunction(observer)) throw new TypeError(ERR_FUNCTION);
    observers = this.$$observers[name];
    if (isArray(observers)) {
        observers.push(observer);
    } else {
        this.$$observers[name] = [observer];
    }
    //}
    notify.call(this, name, this[name]);
    return this;
}

/**
 * @public
 * @this {Observable}
 * @param {string} name
 * @param {function} [observer] - If no observer is passed, all observers are removed
 * @returns {Observable}
 */
function unobserve(name, observer) {
    var index, observers;
    if (!isString(name) || name.length < 1) {
        throw new TypeError(ERR_PROPERTY_NAME);
    }
    observers = this.$$observers[name];
    if (isArray(observers)) {
        if (isFunction(observer)) {
            index = observers.indexOf(observer);
            if (index !== -1) {
                this.$$observers[name].splice(index, 1);
            }
        } else {
            this.$$observers[name] = [];
        }
    }
    return this;
}


/**
 * @private
 * @this {Observable}
 * @param {string} name
 * @param {*} newValue
 * @param {*} oldValue
 * @returns {Observable}
 */
function notify(name, newValue, oldValue) {
    var observers;
    if (!isString(name) || name.length < 1) {
        throw new TypeError(ERR_PROPERTY_NAME);
    }
    observers = this.$$observers[name];
    if (isArray(observers)) {
        observers.forEach(function (observer) {
            observer(newValue, oldValue);
        });
    }
    return this;
}

/**
 * Return the first argument. Same as validation always pass.
 * @private
 * @param value
 * @returns {*}
 */
function noValidation(value) {
    return value;
}
