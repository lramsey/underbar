/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var end = array.length - 1;
    if (n === undefined) {
      return array[end];
    }
    else if (end - n >= 0) {
      return array.slice(end + 1 -n, end + 1);
    }
    else {
      return array;
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
          iterator(collection[i], i, collection);
      }
    }
    else if (typeof collection == "object") {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {

    var thisIsTrue = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (test(collection[i])) {
          thisIsTrue.push(collection[i]);
        }
      }
      return thisIsTrue;
    }
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var thisIsTrue = _.filter(collection, test);
    var thisIsFalse = [];
    for (var i = 0; i < collection.length; i++) {
      for (var j = 0; j < thisIsTrue.length; j++) {
        if (collection[i] === thisIsTrue[j]) {
          break;
        }
        else if (j === thisIsTrue.length - 1) {
          thisIsFalse.push(collection[i]);
        }
      }
    }
    return thisIsFalse;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var unique = [array[0]];
    for (var i = 1; i < array.length; i++) {
      for (var j = 0; j < unique.length; j++) {
        if (array[i] === unique[j]) {
          break;
        }
        else if (j === unique.length -1) {
          unique.push(array[i]);
        }
      }
    }
    return unique;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    var results = [];
    for (var i = 0; i < array.length; i++) {
      results.push(iterator(array[i]));
    }
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var results = [];
    if (typeof functionOrKey === "function") {
      for(var i = 0; i < collection.length; i++) {
        results.push(functionOrKey.apply(collection[i], collection));
      }
    }
    else if (typeof functionOrKey === "string") {
      for (var j = 0; j < collection.length; j++) {
        results.push(collection[j][functionOrKey]());
      }
    }
    return results;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {

    for (var key in collection) {
      if (accumulator === null) {
        accumulator = collection[key];
      }
      else {
      accumulator = iterator(accumulator, collection[key]);
      }
    }
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var truthTest = [];
    for (var key in collection) {
      truthTest.push(collection[key]);
    }
    if (typeof iterator === 'function') {
      truthTest = _.map(truthTest, iterator);
    }
    for (var item in truthTest){
      switch(truthTest[item]) {
        case 0:
          return false;
        case undefined:
          return false;
        case false:
          return false;
        case null:
          return false;
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var someTruth = [];
    var state = false;
    for (var key in collection) {
      someTruth[0] = collection[key];
      if(_.every(someTruth, iterator)){
        return true;
      }
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var num = 1; num < arguments.length; num++) {
      for (var key in arguments[num]) {
        obj[key] = arguments[num][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var num = 1; num < arguments.length; num++) {
      for (var key in arguments[num]) {
        if (obj[key] === undefined) {
          obj[key] = arguments[num][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};

    return function(n) {
      if (results[n] === undefined) {
        results[n] = func.apply(this, arguments);
      }
      return results[n];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments);
    var params = args.slice(2);
    setTimeout(function() {
      func.apply(this, params);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var mixedArray = [];
    for(var key in array) {
      mixedArray[key] = array[key];
    }
    return mixedArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var sorted = [];
    var done = [];
    if (typeof iterator === "function"){
      for(var element in collection){
        sorted.push(iterator(collection[element]));
      }
    }
    else if (typeof iterator === "string") {
      for (var key in collection) {
        sorted.push(collection[key][iterator]);
      }
    }
    sorted = sorted.sort();
    var collector = {};
    for(var property in collection) {
      collector[property] = collection[property];
    }
    
    if (typeof iterator === "function") {
      for(var num = 0; num < sorted.length; num++) {
        for (var item in collector) {
          if (sorted[num] === iterator(collector[item])){
            done.push(collector[item]);
            delete collector[item];
            break;
          }
        }
      }
    }
    else if (typeof iterator === "string"){
      for (var index = 0; index < sorted.length; index++){
        for (var thing in collector) {
          if (sorted[index] === collector[thing][iterator]){
            done.push(collector[thing]);
            delete collector[thing];
            break;
          }
        }
      }
    }
    return done;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zipline = [];
    var sorted = _.sortBy(arguments, 'length');
    var big = sorted[sorted.length - 1];
    for(var i = 0; i < big.length  ; i++){
      var innerArray = [];
      for (var j = 0; j < arguments.length; j++) {
        innerArray.push(arguments[j][i]);
      }
      zipline.push(innerArray);
    }
    return zipline;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var flatlanders = [];
    for(var i = 0; i < nestedArray.length; i++){
      if(!Array.isArray(nestedArray[i])){
        flatlanders.push(nestedArray[i]);
      }
      else if (nestedArray[i].length === 1){
        nestedArray[i] = nestedArray[i][0];
        i--;
      }
      else {
        var newArray = _.flatten(nestedArray[i]);
        for(var j = 0; j< newArray.length; j++) {
          flatlanders.push(newArray[j]);
        }
      }
    }

    return flatlanders;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var results = [];
    for(var i = 0; i < arguments[0].length; i++){
      for(var j = 1; j < arguments.length; j++){
        if(!_.contains(arguments[j], arguments[0][i])){
          break;
        }
        else if (j === arguments.length - 1) {
          results.push(arguments[0][i]);
        }
      }
    }
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var results = [];
    for(var i = 0; i < array.length; i++){
      for(var j = 1; j < arguments.length; j++){
        if(_.contains(arguments[j], array[i])){
          break;
        }
        else if (j === arguments.length - 1) {
          results.push(array[i]);
        }
      }
    }
    return results;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
