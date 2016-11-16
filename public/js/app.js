'use strict';

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
