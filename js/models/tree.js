// ----------------------------------------
// Tree
// ----------------------------------------


var APP = APP || {};


APP.Tree = (function($, Node) {


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


  var _buildChildren = function(tree, stack, node) {
    if (node.depth < tree.depth) {
      for (var i = 0; i < 2; i++) {
        var child = new Node({ parent: node });
        node.children.push(child);
        stack.push(child);
      }
    }
  };


  var _buildTree = function(tree) {
    var stack = [tree.root],
        node;
    while (stack.length) {
      node = stack.pop();
      _buildChildren(tree, stack, node);
    }
  };


  var Tree = function(options) {
    options = options || {};
    this.depth = (options.depth === undefined || options.depth > 6) ? 6 : options.depth;
    this.root = new Node();
    this.$element = $('<div>')
      .addClass('tree');
    this.$container = options.$container || $('#app');
    this.init();
  };


  Tree.prototype.init = function() {
    _buildTree(this);
    _render(this);
  };


  Tree.prototype.find = function(id) {
    var stack = [this.root],
        result,
        node;
    while (stack.length) {
      node = stack.pop();
      if (node.id === id) {
        result = node;
        break;
      } else {
        stack = stack.concat(node.children);
      }
    }
    return result;
  };


  Tree.prototype.processClick = function(id) {
    var receiver = this.find(id);
    receiver.propagate();
  };


  return Tree;

})($, APP.Node);




















