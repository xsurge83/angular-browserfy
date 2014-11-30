require('angular');

var highlightSearchModule = angular.module('myApp.directives.highlightSearch', [])
    .directive('highlightSearch', HighlightSearchDirective)
    .directive('highlightResult', HighlightResultDirective)

HighlightSearchCtrl.$inject = ['$scope', '$rootScope'];

function HighlightSearchCtrl($scope) {
    this.getCurrentSearchValue = function getCurrentSearchValue() {
        return $scope.value;
    };
}

function HighlightSearchDirective() {
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
        require: '^highlightSearch',
        link: function (scope, element, attrs, highlightSearchCtrl) {
            var curSearch, resultItem = $interpolate(attrs.highlightResult, false)(scope);

            scope.$watch(highlightSearchCtrl.getCurrentSearchValue, function (newValue, oldValue) {
                if (curSearch !== newValue) {
                    curSearch = newValue;
                    highlightElement(newValue);
                }
            });

            element.append(resultItem);

            function highlightElement(searchValue) {
                if (searchValue) {
                    element.empty();
                    element.append(highLight(resultItem, searchValue));
                }
            }

            function highLight(itemValue, searchValue) {
                var index, words = searchValue.split(/\b\s+/);
                for (index in words) {
                    itemValue = itemValue
                        .replace(new RegExp('\\b(' + words[index] + ')\\b', "gi"), wrapWithTag("$1"))
                }
                return itemValue;
            }

            function wrapWithTag(value) {
                return '<' + TAG + '>' + value + '</' + TAG + '>';
            }
        }
    }
}

module.exports = highlightSearchModule;