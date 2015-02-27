'use strict';

var Observable = require('../src').Observable;

// Create and new object with observable capabilities
var trafficLight = new Observable();

// Create an observable property (state) with an initial value (red) and a
// validator function
trafficLight.createProperty('state', 'red', function validator(value) {
    if (value === 'red' || value === 'yellow' || value === 'green') {
        return value;
    } else {
        throw new Error('The traffic light can only be red, yellow or green');
    }
});

// Register a handler that will be notified every time the property value changes
trafficLight.observe('state', function (newValue, oldValue) {
    console.log('traffic light changed from', oldValue, 'to', newValue);
});

// Change the property will notify the handler above
trafficLight.state = 'green';
