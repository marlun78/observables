'use strict';

var Observable = require('../src/Observable');
var ObservableBoolean = require('../src/ObservableBoolean');

describe('ObservableBoolean,', function () {
    describe('instance,', function () {
        it('should inherit from Observable', function () {
            var bool = new ObservableBoolean(false);
            expect(bool instanceof Observable).toBe(true);
        });
    });

    describe('constructor,', function () {
        it('should except an initial value', function () {
            var value = true;
            var bool = new ObservableBoolean(value);
            expect(bool.value).toBe(value);
        });
        it('should throw if initial value does not pass validation', function () {
            expect(function () {
                new ObservableBoolean('some value');
            }).toThrow();
        });
    });
});