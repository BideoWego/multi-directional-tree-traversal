// ----------------------------------------
// ColorService
// ----------------------------------------


TreeTraversal.factory('ColorService',
  ['_',
  function(_) {

    var _create = function() {
      return 'rgb(' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) +
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