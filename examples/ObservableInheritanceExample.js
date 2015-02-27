'use strict';

var Observable = require('../src').Observable;

function Car(color) {
    // Be sure to call “super()”
    Observable.call(this);

    // Create an observable property
    this.createProperty('color', color);
}

// Give Car observable capabilities
Car.prototype = Object.create(Observable.prototype);

var car = new Car('blue');

// Register a handler that will be notified every time the property value changes
car.observe('color', function (newValue) {
    console.log('the color of the car changed to', newValue);
});

// Change the property will notify the handler above
car.color = 'pink';
