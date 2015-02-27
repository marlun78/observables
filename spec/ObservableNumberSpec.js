'use strict';

var Observable = require('../src/Observable');
var ObservableNumber = require('../src/ObservableNumber');

describe('ObservableNumber,', function () {
    describe('instance,', function () {
        it('should inherit from Observable', function () {
            var number = new ObservableNumber;
            expect(number instanceof Observable).toBe(true);
        });
    });

    describe('constructor,', function () {
        it('should set the initial value to 0 if undefined', function () {
            var number = new ObservableNumber;
            expect(number.value).toBe(0);
        });
        it('should except an initial value', function () {
            var value = 123;
            var number = new ObservableNumber(value);
            expect(number.value).toBe(value);
        });
        it('should throw if initial value does not pass validation', function () {
            expect(function () {
                new ObservableNumber('some value');
            }).toThrow();
        });
    });
});