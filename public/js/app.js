'use strict';

/* App Module */
/*
var purefoodApp = angular.module('purefood', [
  'ngRoute'
]);
*/
define(['angular'], function (ng) {
	'use strict';
	
	return ng.module('pureFood', [
				 'app.services',
				 'pureFood.controllers',
				 'app.filters',
				 'app.directives',
				 'pureFood.storyMap'
				 ]);
    });
