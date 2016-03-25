// ----------------------------------------
// Node
// ----------------------------------------

var APP = APP || {};


APP.Node = (function($) {

  var _id = 0;

  var _numNodesPropagated;
  var _originalReceiver;
  var _backgroundColor;
  var _borderColor;
  var _timeouts = [];


  var _randomColor = function() {
    return 'rgb(' +
      Math.floor(Math.random() * 256) + ',' +
      Math.floor(Math.random() * 256) + ',' +
      Math.floor(Math.random() * 256) + ')';
  };


  var _delayedReaction = function(origin, sender) {
    var to = setTimeout(function() {
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
      if (_numNodesPropagated === origin.tree.numNodes) {
        _originalReceiver.propagate();
      }
    }, 200);
    _timeouts.push(to);
  };


  var Node = function(options) {
    options = options || {};
    this.id = _id++;
    this.parent = options.parent;
    this.tree = options.tree;
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
      _backgroundColor = _randomColor();
      _borderColor = _randomColor();
      _numNodesPropagated = 0;
      for (var i = _timeouts.length - 1; i >= 0; i--) {
        var to = _timeouts[i];
        clearTimeout(to);
        _timeouts.splice(i, 1);
      }
    }
    _numNodesPropagated++;
    this.$element.css({
      "background": _backgroundColor,
      "border-color": _borderColor
    });
    _delayedReaction(this, sender);
  };


  return Node;

})($);

