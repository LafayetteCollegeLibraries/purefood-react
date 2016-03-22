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
				 'app.controllers',
				 'app.filters',
				 'app.directives',
				 'dss.storyMap'
				 ]);
    });
