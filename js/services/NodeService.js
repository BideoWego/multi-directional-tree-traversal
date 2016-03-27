// ----------------------------------------
// NodeService
// ----------------------------------------


TreeTraversal.factory('NodeService',
  ['_', '$timeout',
  function(_, $timeout) {

    var _id = 0;
    var _numNodesPropagated;
    var _originalReceiver;
    var _onSubsequentPropagation = function() {};
    var _timeouts = [];


    var _clearTimeouts = function() {
      while (_timeouts.length) {
        var i = _timeouts.length - 1;
        var to = _timeouts[i];
        $timeout.cancel(to);
        _timeouts.splice(i, 1);
      }
    };


    var _findReceivers = function(node, sender) {
      var receivers = [];
      if (sender !== node.parent) {
        receivers.push(node.parent);
      }
      var children = node.children.slice();
      var index = children.indexOf(sender);
      if (!!~index) {
        children.splice(index, 1);
      }
      receivers = receivers.concat(children)
      return receivers;
    };


    var _sendMessages = function(node, receivers) {
      var receiver;
      while (receivers.length) {
        receiver = receivers.pop();
        if (receiver) {
          receiver.propagate(node);
        }
      }
    };


    var _propagateMessages = function(node, sender) {
      var receivers = _findReceivers(node, sender);
      var to = $timeout(function() {
        _sendMessages(node, receivers);
        _resolveContinuousPropagation(node, sender);
      }, node.tree.delay);
      _timeouts.push(to);
    };


    var _resolveContinuousPropagation = function(node, sender) {
      if (_numNodesPropagated === node.tree.numNodes &&
          node.tree.active) {
        var to = $timeout(function() {
          _onSubsequentPropagation();
          _originalReceiver.propagate();
        }, node.tree.delay);
        _timeouts.push(to);
      }
    };


    var _initializePropagation = function(node, sender) {
      if (sender === undefined) {
        _numNodesPropagated = 0;
        _originalReceiver = node;
        _clearTimeouts();
      }
    };


    var _propagate = function(node) {
      return function(sender) {
        _initializePropagation(node, sender);
        _numNodesPropagated++;
        node.onPropagate(node);
        _propagateMessages(node, sender);
      };
    };


    var NodeService = {};


    NodeService.setOnSubsequentPropagation = function(onSubsequentPropagation) {
      _onSubsequentPropagation = onSubsequentPropagation;
    };


    NodeService.create = function(options) {
      options = options || {};

      var node = {
        id: _id++,
        parent: options.parent,
        tree: options.tree,
        depth: (options.parent) ? options.parent.depth + 1 : 0,
        children: [],
        onPropagate: function() {}
      };

      node.propagate = _propagate(node);

      return node;
    };


    NodeService.clearTimeouts = _clearTimeouts;


    return NodeService;

  }]);








