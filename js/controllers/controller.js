// ----------------------------------------
// Controller
// ----------------------------------------


var APP = APP || {};


APP.Controller = (function(Tree, View) {

  var _tree;

  var _receiveClick = function(id) {
    _tree.processClick(id);
  };

  return {
    init: function() {
      _tree = new APP.Tree();
      View.init(_tree, _receiveClick);
    }
  };

})(APP.Tree, APP.View);


