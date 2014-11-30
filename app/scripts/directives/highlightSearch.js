require('angular');

var highlightSearchModule = angular.module('myApp.directives.highlightSearch', [])
    .directive('highlightSearch', HighlightSearchDirective)
    .directive('highlightResult', HighlightResultDirective)

HighlightSearchCtrl.$inject = ['$scope', '$rootScope'];

function HighlightSearchCtrl($scope, $rootScope) {
    $scope.$watch('value', function (newVal) {
        $rootScope.$broadcast('highlightupdate', newVal);
    });
}

function HighlightSearchDirective($interpolate) {
    return {
        restrict: 'A',
        scope: {
            value: '=ngModel'
        },
        controller: HighlightSearchCtrl
    }
}

function HighlightResultDirective($interpolate) {
    var TAG = 'b';
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var resultItem = $interpolate(attrs.highlightResult, false)(scope);
            scope.$on('highlightupdate', highlightElement)

            element.append(resultItem);

            function highlightElement($event, searchValue) {
                if (searchValue) {
                    element.empty();
                    element.append(highLight(resultItem, searchValue));
                }
            }

            function highLight(itemValue, searchValue) {
                return itemValue
                    .replace(new RegExp('\\b(' + searchValue + ')\\b', "gi"), wrapWithTag("$1"))
            }

            function wrapWithTag(value) {
                return '<' + TAG + '>' + value + '</' + TAG + '>';
            }
        }
    }
}

module.exports = highlightSearchModule;