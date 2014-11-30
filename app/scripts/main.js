'use strict';
require('angular'); // That's right! We can just require angular as if we were in node

angular.module('myApp', [
	require('./controllers/demoCtrl').name, 
	require('./directives/highlightSearch').name]);
 