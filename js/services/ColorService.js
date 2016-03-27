// ----------------------------------------
// ColorService
// ----------------------------------------


TreeTraversal.factory('ColorService',
  ['_',
  function(_) {

    var _min = 1,
        _max = 256,
        _colors = {
          red: 0,
          green: 0,
          blue: 0
        };


    var _generate = function() {
      var values = _.values(_colors);
      var reduction = _.reduce(values, function(sum, value) {
        return sum + value;
      });
      var half = _max / 2;
      var min = (reduction < half) ? half : _min;
      var max = (reduction > half) ? _max : half;
      _colors = {
        red: _.random(min, max),
        green: _.random(min, max),
        blue: _.random(min, max)
      }
    };


    var _create = function() {
      _generate();
      return 'rgb(' +
        _colors.red + ',' +
        _colors.green + ',' +
        _colors.blue +
      ')';
    };

    return {
      backgroundColor: '#eee',
      borderColor: '#333',
      randomize: function() {
        this.backgroundColor = _create();
        this.borderColor = _create();
      }
    };

  }]);