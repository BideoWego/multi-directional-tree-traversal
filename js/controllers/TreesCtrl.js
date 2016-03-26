// ----------------------------------------
// TreesCtrl
// ----------------------------------------


TreeTraversal.controller('TreesCtrl',
  ['$scope', 'TreeService', 'NodeService', 'ColorService',
  function($scope, TreeService, NodeService, ColorService) {

    $scope.delay = 200;
    $scope.tree = TreeService.create({ delay: $scope.delay });
    
    $scope.tree.each(function(node) {
      node.onPropagate = function(node) {
        var $node = angular.element('.node[data-id="' + node.id + '"]');
        $node.css({
          "background": ColorService.backgroundColor,
          "border-color": ColorService.borderColor
        });
      };
    });

    $scope.onNodeClick = function(id) {
      ColorService.randomize();
      $scope.tree.processClick(id);
    };

    NodeService.setOnSubsequentPropagation(function() {
      ColorService.randomize();
    });

  }]);






