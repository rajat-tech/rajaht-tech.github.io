'use strict';

angular.module('app.board', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/board', {
    templateUrl: 'views/board.html'
  , controller: 'BoardController'
  })
}])

.controller('BoardController', function(
	$scope,
	$location,
	$timeout,
	$routeParams,
	networkData
) {
	$scope.networkData = networkData
	$scope.attributeListDetailLevel = 1
	$scope.selectedAttId = undefined
	$scope.sizeAttId = undefined
	$scope.colorAttId = undefined
	$scope.sizePlusColor = false

	$scope.$watch('selectedAttId', updateMapSettings)

	function updateMapSettings(newSelectedAttId, oldSelectedAttId) {
		if ($scope.selectedAttId) {
			var selectedAtt = $scope.networkData.nodeAttributesIndex[$scope.selectedAttId]
			if (selectedAtt) {
				if (selectedAtt.type == 'partition' || selectedAtt.type == 'ranking-color') {
					$scope.colorAttId = selectedAtt.id
					if (!$scope.sizePlusColor) {
						$scope.sizeAttId = undefined
					}
				} else if (selectedAtt.type == 'ranking-size') {
					$scope.sizeAttId = selectedAtt.id
					if (!$scope.sizePlusColor) {
						$scope.colorAttId = undefined
					}
				}
			}
		} else if (oldSelectedAttId) {
			// Remove previous selected att
			var oldSelectedAtt = $scope.networkData.nodeAttributesIndex[oldSelectedAttId]
			if (oldSelectedAtt.type == 'partition' || oldSelectedAtt.type == 'ranking-color') {
				$scope.colorAttId = undefined
			} else if (oldSelectedAtt.type == 'ranking-size') {
				$scope.sizeAttId = undefined
			}
		}
	}

	$scope.networkNodeClick = function(nid) {
    console.log('Click on', nid)
  }
})
