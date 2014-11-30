"use strict";
require('angular'); 

function DemoCtrl($scope) {
  $scope.searchValue = 'Wife';
  $scope.items = ['My wife is awesome wife'];
};

module.exports = angular.module('myApp.demoCtrl', [])
	.controller('DemoCtrl', ['$scope', DemoCtrl]);
