'use strict';

var Observable = require('../src/Observable');
var ObservableValue = require('../src/ObservableValue');

describe('ObservableValue,', function () {
    describe('instance,', function () {
        it('should inherit from Observable', function () {
            var observable = new ObservableValue;
            expect(observable instanceof Observable).toBe(true);
        });
    });

    describe('constructor,', function () {
        it('should except an initial value', function () {
            var value = 'Some value';
            var observable = new ObservableValue(value);
            expect(observable.value).toBe(value);
        });
    });
});