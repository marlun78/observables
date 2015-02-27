'use strict';

var Observable = require('../src/Observable');

describe('Observable,', function () {
    var observable, noop;
    beforeEach(function () {
        observable = new Observable;
        noop = function () { };
    });

    describe('$$observers,', function () {
        it('should be an “own” property', function () {
            expect(observable.hasOwnProperty('$$observers')).toBe(true);
        });
        it('should be an object', function () {
            expect(observable.$$observers).toEqual(jasmine.any(Object));
        });
    });

    describe('notify,', function () {
        it('should be a function', function () {
            expect(observable.notify).toEqual(jasmine.any(Function));
        });
        it('should throw if first argument is not a string', function () {
            expect(function () {
                observable.notify(null);
            }).toThrow();
        });
        it('should call all registered observers once with the new and an old value',
            function () {
                var property = 'someProp';
                var newValue = 'Some value';
                var oldValue = null;
                var spy1 = jasmine.createSpy('notify-spy-1');
                var spy2 = jasmine.createSpy('notify-spy-2');
                observable.$$observers[property] = [spy1, spy2];
                observable.notify(property, newValue, oldValue);

                expect(spy1).toHaveBeenCalledWith(newValue, oldValue);
                expect(spy1.calls.count()).toBe(1);
                expect(spy2).toHaveBeenCalledWith(newValue, oldValue);
                expect(spy2.calls.count()).toBe(1);
            }
        );
        it('should return the observable', function () {
            expect(observable.notify('x')).toEqual(observable);
        });
    });

    describe('observe,', function () {
        it('should be a function', function () {
            expect(observable.observe).toEqual(jasmine.any(Function));
        });
        it('should throw if first argument is not a string', function () {
            expect(function () {
                observable.observe(null, noop);
            }).toThrow();
        });
        it('should throw if second argument is not a function', function () {
            expect(function () {
                observable.observe('', null);
            }).toThrow();
        });
        it('should take an observer function and add it to the list of observers',
            function () {
                var property = 'someProp';
                expect(observable.$$observers[property]).toBeUndefined();
                observable.observe(property, noop);
                expect(observable.$$observers[property].length).toEqual(1);
            }
        );
        it('should take an observer function and append it to the list of observers',
            function () {
                var property = 'someProp';
                observable.$$observers[property] = [];
                observable.observe(property, noop);
                expect(observable.$$observers[property].length).toEqual(1);
            }
        );
        it('should return the observable', function () {
            expect(observable.observe('x', noop)).toEqual(observable);
        });
    });

    describe('unobserve,', function () {
        it('should be a function', function () {
            expect(observable.unobserve).toEqual(jasmine.any(Function));
        });
        it('should throw if first argument is not a string', function () {
            expect(function () {
                observable.unobserve(null, noop);
            }).toThrow();
        });
        it('should remove the passed observer from the list of observers',
            function () {
                var property = 'someProp';

                observable.$$observers[property] = [noop, observer, noop];
                observable.unobserve(property, observer);

                var observers = observable.$$observers[property];
                expect(observers.length).toEqual(2);
                expect(observers).toEqual(jasmine.arrayContaining([noop]));
                expect(observers).not.toEqual(jasmine.arrayContaining([observer]));

                function observer() { }
            }
        );
        it('should remove all observers if no function is passed', function () {
            var property = 'someProp';

            observable.$$observers[property] = [noop, observer];
            observable.unobserve(property);

            var observers = observable.$$observers[property];
            expect(observers.length).toEqual(0);
            expect(observers).not.toEqual(jasmine.arrayContaining([noop]));
            expect(observers).not.toEqual(jasmine.arrayContaining([observer]));

            function observer() { }
        });
        it('should return the observable', function () {
            expect(observable.unobserve('x', noop)).toEqual(observable);
        });
    });

    describe('createProperty,', function () {
        it('should be a function', function () {
            expect(observable.createProperty).toEqual(jasmine.any(Function));
        });
        it('should throw if first argument is not a string', function () {
            expect(function () {
                observable.createProperty(null);
            }).toThrow();
        });
        it('should throw if first argument is an empty-string', function () {
            expect(function () {
                observable.createProperty('');
            }).toThrow();
        });
        it('should accept an second optional argument for the initial value',
            function () {
                var property = 'someProp';
                var value = 234;
                observable.createProperty(property, value);
                expect(observable[property]).toEqual(value);
            }
        );
        it('should accept a third optional argument for input validation',
            function () {
                var spy = jasmine.createSpy('input-validation-spy');
                var property = 'someProp';
                var value = 'some value';
                observable.createProperty(property, null, spy);

                expect(spy).not.toHaveBeenCalled();

                observable[property] = value;

                expect(spy).toHaveBeenCalledWith(value);
                expect(spy.calls.count()).toEqual(1);
            }
        );
        it('should notify all observers when the observed property changes',
            function () {
                var spy = jasmine.createSpy('notify-spy');
                var property = 'someProp';
                var initialValue = 'Some value';
                var newValue = 'Some other value';
                observable.createProperty(property, initialValue);
                observable.observe(property, spy);

                // Same value
                observable[property] = initialValue;
                expect(spy).not.toHaveBeenCalled();

                // New value
                observable[property] = newValue;
                expect(spy).toHaveBeenCalledWith(newValue, initialValue);
            }
        );
        it('should return the observable', function () {
            expect(observable.createProperty('x')).toEqual(observable);
        });
    });
});