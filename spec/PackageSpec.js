'use strict';

var pack = require('../src');

describe('Package,', function () {
    it('should expose Observable', function () {
        expect(pack.Observable).toBeDefined();
    });
    it('should expose ObservableBoolean', function () {
        expect(pack.ObservableBoolean).toBeDefined();
    });
    it('should expose ObservableNumber', function () {
        expect(pack.ObservableNumber).toBeDefined();
    });
    it('should expose ObservableString', function () {
        expect(pack.ObservableString).toBeDefined();
    });
    it('should expose ObservableValue', function () {
        expect(pack.ObservableValue).toBeDefined();
    });
});