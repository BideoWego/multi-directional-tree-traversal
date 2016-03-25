// ----------------------------------------
// View
// ----------------------------------------


var APP = APP || {};


APP.View = (function($) {

  return {
    init: function(onClick) {
      $('.node').click(function(e) {
        e.preventDefault();
        var $node = $(e.target);
        var id = ~~$node.attr('data-id');
        onClick(id);
        return false;
      });
    }
  };

})($);

