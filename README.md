# Observables

Description

## Install

```bash
npm install me-observable
```

## Observable

### Methods

#### createProperty
`Observable.prototype.createProperty(name[, value[, validator]])`

##### `name` (string)
The property name. Can be used just like a “normal” property.

##### `value` (any, optional, defaults to `undefined`)
The initial value of the property. If a validator is specified, the value will
first run threw it.

##### `validator` (function, optional)
`validator(proposedValue, currentValue)`

A function that can be used to validate the value before it’s assigned to the
property. It gets two parameters, the new value being assigned and the current
value. What ever the function returns will be assigned to the property.

#### notify
`Observable.prototype.notify(name, newValue, oldValue)`

#### observe
`Observable.prototype.observe(name, observer)`

#### unobserve
`Observable.prototype.unobserve(name[, observer])`

Unregisters an observer. If no observer is passed, all observers are removed.

### Examples
```javascript
var Observable = require('me-observable').Observable;

var trafficLight = new Observable();
trafficLight.createProperty('state', 'red');
trafficLight.observe('state', function (newValue, oldValue) {
    console.log('traffic light changed from', oldValue, 'to', newValue);
});
trafficLight.state = 'green';
// logs: traffic light changed from red to green
```

#### Inheritance
See [[examples/ObservableInheritanceExample.js]]

#### With Validator
See [[examples/ObservableWithValidatorExample.js]]

## ObservableValue
```javascript
var ObservableValue = require('me-observable').ObservableValue;
```

## ObservableBoolean
```javascript
var ObservableBoolean = require('me-observable').ObservableBoolean;
```

## ObservableNumber
```javascript
var ObservableNumber = require('me-observable').ObservableNumber;
```

## ObservableString
```javascript
var ObservableString = require('me-observable').ObservableString;
```

## Comments / Bugs

Comments and bug reports are much appreciated. Please enter them on the issues page. Thanks!
