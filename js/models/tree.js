// ----------------------------------------
// Tree
// ----------------------------------------


var APP = APP || {};


APP.Tree = (function($, Node) {


  var _buildChildren = function(tree, stack, node) {
    if (node.depth < tree.depth) {
      for (var i = 0; i < 2; i++) {
        var child = new Node({
          parent: node,
          tree: tree
        });
        node.children.push(child);
        stack.push(child);
        tree.numNodes++;
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
    this.root = new Node({ tree: this });
    this.numNodes = 1;
    this.$element = $('<div>')
      .addClass('tree');
    this.$container = options.$container || $('#app');
    this.init();
  };


  Tree.prototype.init = function() {
    _buildTree(this);
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




















