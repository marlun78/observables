'use strict';

var Observable = require('../src/Observable');
var ObservableString = require('../src/ObservableString');

describe('ObservableString,', function () {
    describe('instance,', function () {
        it('should inherit from Observable', function () {
            var string = new ObservableString;
            expect(string instanceof Observable).toBe(true);
        });
    });

    describe('constructor,', function () {
        it('should set the initial value to 0 if undefined', function () {
            var string = new ObservableString;
            expect(string.value).toBe('');
        });
        it('should except an initial value', function () {
            var value = 'some value';
            var string = new ObservableString(value);
            expect(string.value).toBe(value);
        });
        it('should throw if initial value does not pass validation', function () {
            expect(function () {
                new ObservableString(123);
            }).toThrow();
        });
    });
});