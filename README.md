# Observables

Description

---

## Install

```bash
...
```

---

## Observable

### Methods

#### `Observable.prototype.createProperty()`

##### Syntax
```javascript
observable.createProperty(name[, value[, validator]]);
```

##### Parameters

**`name`** (string)  
The property name. Can be used just like a “normal” property.

**`value`** (any, optional, defaults to `undefined`)  
The initial value of the property. If a validator is specified, the value will
first run threw it.

**`validator`** (function, optional)  
A function that can be used to validate the value before it’s assigned to the
property. It gets two parameters, the new value being assigned and the current
value. What ever the function returns will be assigned to the property.  
Its signature is `validator(proposedValue, currentValue)`.

#### `Observable.prototype.observe()`
Registers an observer for a property. The observer will get called with the new 
and the previous value everytime time the property changes. 

##### Syntax
`observable.observe(name, observer);`

#### `Observable.prototype.unobserve()`
Unregisters an observer. If no observer is passed, all observers are removed.

##### Syntax
`observable.unobserve(name[, observer]);`

### Examples
For examples, see the [examples](examples) directory.

--- 

## Single Value Observables

There are also some Single Value Observable util functions. Currently there 
are `ObservableBoolean`, `ObservableNumber`, `ObservableString` and 
`ObservableValue`. 

Example:  
```javascript
var ObservableString = require('me-observable').ObservableString;
var string = new ObservableString('hello');
string.observe(function(){});
string.value = 'hola';
```

---

## Comments / Bugs

Comments and bug reports are much appreciated. Please enter them on the issues page. Thanks!
