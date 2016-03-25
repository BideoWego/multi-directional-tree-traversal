// ----------------------------------------
// Node
// ----------------------------------------

var APP = APP || {};


APP.Node = (function($) {

  var _id = 0;


  var _originalReceiver;
  var _color;


  var _randomColor = function() {
    return 'rgb(' +
      Math.floor(Math.random() * 256) + ',' +
      Math.floor(Math.random() * 256) + ',' +
      Math.floor(Math.random() * 256) + ')';
  };


  var _delayedReaction = function(origin, sender) {
    setTimeout(function() {
      var receivers = [];
      if (sender !== origin.parent) {
        receivers.push(origin.parent);
      }
      var children = origin.children.slice();
      var index = children.indexOf(sender);
      if (!!~index) {
        children.splice(index, 1);
      }
      receivers = receivers.concat(children);
      var receiver;
      while (receivers.length) {
        receiver = receivers.pop();
        if (receiver) {
          receiver.propagate(origin);
        }
      }
    }, 200);
  };


  var Node = function(options) {
    options = options || {};
    this.id = _id++;
    this.parent = options.parent;
    this.depth = (this.parent) ? this.parent.depth + 1 : 0;
    this.children = options.children || [];
    this.$element = $('<a>')
      .addClass('node')
      .attr('href', '')
      .attr('data-id', this.id);
    if (this.parent) {
      this.$element
        .attr('data-parent-id', this.parent.id);
    }
  };


  Node.prototype.propagate = function(sender) {
    if (sender === undefined) {
      _originalReceiver = this;
      _color = _randomColor();
    }
    this.$element.css('background', _color);
    _delayedReaction(this, sender);
  };


  return Node;

})($);

