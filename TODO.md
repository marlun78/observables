# TODO

## Code
- Implement support for Arrays (deep)
- Implement support for all properties on an Observable
`observable.observe(function (property, newValue, oldValue) {});`

## Tests
- Write test-case for inheritance
```
function Person(name) {
  Observable.call(this);
  this.createProperty('name', name);
}
Person.prototype = Object.create(Observable.prototype);
var person = new Person('Martin');
person.name = 'Fabian';
```

## Docs
- Write more examples in README and examples directory
