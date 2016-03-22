/**
 * bootstraps angular onto the window.document node
 */
define(['require',
	'angular',
	'pureFood',
	'routes'], function (require, ng) {
	   'use strict';

	   require(['domReady!'], function (document) {
		   ng.bootstrap(document, ['pureFood']);
	       });
       });
