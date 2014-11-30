require('angular');

var highlightSearchModule = angular.module('myApp.directives.highlightSearch', [])
	.directive('highlightSearch', HighlightSearchDirective)
	.directive('highlightResult', HighlightResultDirective)

HighlightSearchCtrl.$inject = ['$scope', '$element', '$attrs'];

function HighlightSearchCtrl($scope, $element, $attrs) {

	this.getCurrentSearch = function() {
		return $scope.model;
	};

	$scope.$watch('model', function(newVal, oldVal) {

		$scope.$emit('highlightupdate', newVal);
	});
}

function HighlightSearchDirective($interpolate) {
	return {
		restrict: 'A',
		scope: {
			model: '=ngModel'
		},
		controller: HighlightSearchCtrl,
	}
}

function HighlightResultDirective($interpolate) {
	return {
		restrict: 'A',
		require: '^highlightSearch',
		link: function(scope, element, attrs, highlightSearchCtrl) {

			scope.$on('highlightupdate', highlightElement)

			function highlightElement($event, searchValue) {
				if (searchValue) {
					debugger; 
					var resultItem = $interpolate(attrs.highlightResult, false)(scope);
					element.empty();
					element.append(resultItem.replace(new RegExp('\\b' + searchValue + '\\b') , "<h2>" + searchValue + "</h2>"));
				}
			}
		},
	}
}



module.exports = highlightSearchModule;