'use strict';

var isArray = require('lodash.isarray');
var isFunction = require('lodash.isfunction');
var isString = require('lodash.isstring');

var ERR_OBSERVER_FUNCTION = 'Observer must be a function';
var ERR_OBSERVER_PROPERTY_NAME =
    'Observer property name must be a non-empty string';

module.exports = Observable;

/**
 * @constructor
 */
function Observable() {
    this.$$observers = Object.create(null);
}

Observable.prototype = {
    constructor: Observable,

    /**
     * @param {string} name
     * @param {*} [value] - Initial value if any
     * @param {function} [validator]
     * @returns {Observable}
     */
    createProperty: function createProperty(name, value, validator) {
        var privateValue = value,
            self = this;
        if (!isString(name) || name.length < 1) {
            throw new TypeError(ERR_OBSERVER_PROPERTY_NAME);
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
                    self.notify(name, newValue, oldValue);
                }
            }
        });
        return this;
    },

    /**
     * @param {string} name
     * @param {*} newValue
     * @param {*} oldValue
     * @returns {Observable}
     */
    notify: function notify(name, newValue, oldValue) {
        var observers;
        if (!isString(name) ||
            name.length < 1) {
            throw new TypeError(ERR_OBSERVER_PROPERTY_NAME);
        }
        observers = this.$$observers[name];
        if (isArray(observers)) {
            observers.forEach(function (observer) {
                observer(newValue, oldValue);
            });
        }
        return this;
    },

    /**
     * @param {string} name
     * @param {function} observer
     * @returns {Observable}
     */
    observe: function observe(name, observer) {
        var observers;
        if (!isString(name) ||
            name.length < 1) {
            throw new TypeError(ERR_OBSERVER_PROPERTY_NAME);
        }
        if (!isFunction(observer)) throw new TypeError(ERR_OBSERVER_FUNCTION);
        observers = this.$$observers[name];
        if (isArray(observers)) {
            observers.push(observer);
        } else {
            this.$$observers[name] = [observer];
        }
        //TODO: this.notify(name, this[name]);
        return this;
    },

    /**
     * @param {string} name
     * @param {function} [observer] - If no observer is passed, all observers are removed
     * @returns {Observable}
     */
    unobserve: function unobserve(name, observer) {
        var index, observers;
        if (!isString(name) ||
            name.length < 1) {
            throw new TypeError(ERR_OBSERVER_PROPERTY_NAME);
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
};

function noValidation(value) {
    return value;
}
