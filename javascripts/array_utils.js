(function() {
  var ArrayUtils;

  ArrayUtils = (function() {
    function ArrayUtils() {}

    ArrayUtils.sample = function(array) {
      return array[Math.floor(Math.random() * array.length)];
    };

    ArrayUtils.sampleSome = function(array, number, excepts) {
      var candidates, i, picked, pickedUps, _i;
      if (excepts == null) {
        excepts = [];
      }
      if (number < 1) {
        return [];
      }
      candidates = excepts.length > 0 ? this.difference(array, excepts) : array;
      pickedUps = [];
      for (i = _i = 1; 1 <= number ? _i <= number : _i >= number; i = 1 <= number ? ++_i : --_i) {
        picked = this.sample(candidates);
        pickedUps.push(picked);
        candidates = this.remove(candidates, picked);
      }
      return pickedUps;
    };

    ArrayUtils.remove = function(array, element) {
      return $.grep(array, function(e, i) {
        return e !== element;
      });
    };

    ArrayUtils.populate = function(element, number) {
      var i, _i, _results;
      _results = [];
      for (i = _i = 1; 1 <= number ? _i <= number : _i >= number; i = 1 <= number ? ++_i : --_i) {
        _results.push(element);
      }
      return _results;
    };

    ArrayUtils.zipPopulate = function(elements, numbers) {
      var element, i, ret, _i, _len;
      ret = [];
      if (elements.length > numbers.length) {
        return ret;
      }
      for (i = _i = 0, _len = elements.length; _i < _len; i = ++_i) {
        element = elements[i];
        ret = ret.concat(this.populate(element, numbers[i]));
      }
      return ret;
    };

    ArrayUtils.difference = function(array1, array2) {
      return $.grep(array1, function(element, index) {
        return $.inArray(element, array2) === -1;
      });
    };

    ArrayUtils.sampleAndDouble = function(array) {
      var clone, picked;
      clone = [].concat(array);
      picked = this.sample(clone);
      clone.splice($.inArray(picked, clone), 0, picked);
      return clone;
    };

    return ArrayUtils;

  })();

  this.ArrayUtils = ArrayUtils;

}).call(this);
