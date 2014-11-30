'use strict';
require('angular'); // That's right! We can just require angular as if we were in node

angular.module('myApp', [
	require('./controllers/welcomeCtrl').name, 
	require('./directives/highlight-search').name]);
 