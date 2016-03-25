// ----------------------------------------
// View
// ----------------------------------------


var APP = APP || {};


APP.View = (function($) {


  var _render = function(tree) {
    var queue = [tree.root];
    while (queue.length) {
      node = queue.shift();
      var $row;
      if (!tree.$element.find('#depth-' + node.depth).length) {
        $row = $('<div>')
          .addClass('clearfix')
          .addClass('depth')
          .attr('id', 'depth-' + node.depth);
        tree.$element.append($row);
      }
      $row.append(node.$element);
      queue = queue.concat(node.children);
    }
    tree.$element.appendTo(tree.$container);
  };


  var _setClickListeners = function(onClick) {
    $('.node').click(function(e) {
      e.preventDefault();
      var $node = $(e.target);
      var id = ~~$node.attr('data-id');
      onClick(id);
      return false;
    });
  };


  return {
    init: function(tree, onClick) {
      _render(tree);
      _setClickListeners(onClick);
    }
  };

})($);

