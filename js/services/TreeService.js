// ----------------------------------------
// TreeService
// ----------------------------------------


TreeTraversal.factory('TreeService',
  ['_', 'NodeService',
  function(_, NodeService) {

    var _buildChildren = function(tree, stack, node) {
      if (node.depth < tree.depth) {
        for (var i = 0; i < 2; i++) {
          var child = NodeService.create({
            parent: node,
            tree: tree
          });
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
        if (!tree.nodes[node.depth]) {
          tree.nodes[node.depth] = [];
        }
        tree.nodes[node.depth].push({ id: node.id });
        _buildChildren(tree, stack, node);
      }
    };


    var _find = function(tree) {
      return function(id) {
        var stack = [tree.root],
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
    };


    var _each = function(tree) {
      return function(callback) {
        var stack = [tree.root],
            result,
            node;
        while (stack.length) {
          node = stack.pop();
          callback(node);
          stack = stack.concat(node.children);
        }
      };
    };


    var _processClick = function(tree) {
      return function(id) {
        tree.active = true;
        var receiver = tree.find(id);
        receiver.active = true;
        receiver.propagate();
      };
    };


    var _deactivate = function(tree) {
      return function() {
        tree.active = false;
      };
    };


    var TreeService = {};


    TreeService.create = function(options) {
      options = options || {};

      var tree = {
        delay: options.delay,
        depth: (options.depth === undefined || options.depth > 6) ? 6 : options.depth,
        root: NodeService.create({ tree: this }),
        nodes: [[]],
        active: false
      };

      tree.find = _find(tree);
      tree.processClick = _processClick(tree);
      tree.each = _each(tree);
      tree.deactivate = _deactivate(tree);

      _buildTree(tree);
      tree.numNodes = _.flatten(tree.nodes).length;

      return tree;
    };


    return TreeService;    

  }]);










