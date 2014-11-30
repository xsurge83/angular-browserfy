"use strict";
require('angular'); 

function WelcomeCtrl($scope) {
  $scope.testVar = 'Sergey';
  $scope.resultItem = 'Melissa is awesome'; 
};

module.exports = angular.module('myApp.welcomCtrl', [])
	.controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);
