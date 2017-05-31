/**
 * The Story Map Directive
 * Derived primarily from the design pattern featured in http://justinchmura.com/2014/06/16/using-angularjs-esri-javascript-api/
 *
 */

var app = angular.module('purefood', ['ngSanitize', 'angular-drupal', 'ngRoute', 'ui.router']);

/**
 * Configuration for the routes
 *
 */
app.config(['$provide', '$routeProvider', '$stateProvider', '$urlRouterProvider', function($provide, $routeProvider, $stateProvider, $urlRouterProvider) {
	    $provide.
	      value('drupalSettings', {
	        sitePath: 'http://purefood.exhibits.stage.lafayette.edu/admin',
		endpoint: 'api'
	      });
	    /*
	    $routeProvider.
	      when('/paraf', {
	        templateUrl: 'app/partials/paraf.html'
	      }).
	      when('/margarine-legislation', {
		      templateUrl: 'app/partials/margarine_legislation.html'
	      }).
	      when('/margarine-production', {
		      templateUrl: 'app/partials/margarine_production.html'
	      }).
	      when('/margarine-exports', {
		      templateUrl: 'app/partials/margarine_exports.html'
	      }).
	      when('/cottonseed-production', {
		      templateUrl: 'app/partials/cottonseed_production.html'
	      }).
	      when('/cottonseed-exports', {
		      templateUrl: 'app/partials/cottonseed_exports.html'
	      }).
	      when('/glucose-production', {
		      templateUrl: 'app/partials/glucose_production.html'
	      }).
	      when('/glucose-exports', {
		      templateUrl: 'app/partials/glucose_exports.html'
	      }).
	      when('/notes', {
		      templateUrl: 'app/partials/notes.html'
	      }).
	      otherwise({
		templateUrl: 'app/partials/chapters.html',
		controller: 'ChaptersCtrl'
	      });
	    */
	    /*
	    $routeProvider.
	      otherwise({
		      templateUrl: 'app/partials/chapters.html',
		      controller: 'ChaptersCtrl'
	    });
	    */
	    $urlRouterProvider.otherwise('/chapters');

	    $stateProvider.
	      state('/paraf', {
	       url: '/paraf',
	       templateUrl: 'app/partials/paraf.html'
	      }).
	      state('/paraf.event.content', {
	       url: '/paraf-event-content',
	       templateUrl: 'app/partials/paraf.event.content.html'
	      }).
	      state('/margarine-legislation', {
	       url: '/margarine-legislation',
		      templateUrl: 'app/partials/margarine_legislation.html'
	      }).
	      state('/margarine-production', {
	       url: '/margarine-production',
		      templateUrl: 'app/partials/margarine_production.html'
	      }).
	      state('/margarine-exports', {
	       url: '/margarine-exports',
		      templateUrl: 'app/partials/margarine_exports.html'
	      }).
	      state('/cottonseed-production', {
	       url: '/cottonseed-production',
		      templateUrl: 'app/partials/cottonseed_production.html'
	      }).
	      state('/cottonseed-exports', {
	       url: '/cottonseed-exports',
		      templateUrl: 'app/partials/cottonseed_exports.html'
	      }).
	      state('/glucose-production', {
	       url: '/glucose-production',
		      templateUrl: 'app/partials/glucose_production.html'
	      }).
	      state('/glucose-exports', {
	       url: '/glucose-exports',
		      templateUrl: 'app/partials/glucose_exports.html'
	      }).
	      state('/notes', {
	       url: '/notes',
		      templateUrl: 'app/partials/notes.html'
	      }).
	      state('/chapters', {
	       url: '/chapters',
			  templateUrl: 'app/partials/chapters.html',
			  controller: 'ChaptersCtrl'
	      });
	}]);

/**
 * The controller for the lightbox
 *
 */


/**
 * The controller for the landing page
 *
 */
app.controller('ChaptersCtrl', ['$scope', '$http', function($scope, $http) {
	    $http.get('data/chapters.json').success(function(data) {
		    $scope.chapters = data;
		});
	}]);

/**
 * Controller for the Drupal authentication
 *
 */
app.controller('UserLoginCtrl', ['$scope', 'drupal', function($scope, drupal) {

	    /*
	    $scope.submit = function(user) {

		drupal.user_login(user.name, user.pass).then(function(data) {

			alert('Hello ' + data.user.name + '!');
		    });
	    };
	    */
	    $scope.submit = function() {

		drupal.node_load(1).then(function(node) {
			alert(node.title);
		    });
	    };
	}]);

/**
 * For Events in the Story Map
 * Because this data was not structured into the attribute table for the geospatial Features, it remains structured within an external data source
 *
 */

/**
 * Service for the StoryEvent Objects
 *
 */
app.factory('storyEvents', ['$http', function($http) {
	    var deferred = $http.get('data/events.json').success(function(data) {
		    return data;
		});

	    return deferred;
	}]);

app.controller('StoryEventController', ['$rootScope', '$scope',
					function StoryEventController($rootScope, $scope) {

					    $scope.updateEvent = function(name, content) {
						$scope.name = name;
						$scope.content = content;
					    };
					}]);

app.directive('storyEvent', function($compile) {
	return {
	    restrict: 'E',
		controller: 'StoryEventController',
		link: function (scope, element, attrs) {
		var template = '<div>This is the name: {{name}}</div><div>This is the content: {{content}}</div>';

		element.html(template).show();

		$compile(element.contents())(scope);
	    },
		scope: {
		name: '=',
		    content: '='
		    }
	};
    });


(function (require, angular, app) {
    'use strict';


    require(["esri/map", "esri/dijit/HomeButton", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer",
	     "esri/TimeExtent", "esri/dijit/TimeSlider", "esri/config", "esri/geometry/Point", "esri/geometry/Extent",
	     "esri/tasks/query", "esri/tasks/QueryTask",
	     "dojo/_base/array", "dojo/dom", "dojo/html", "dojo/domReady!"], function(Map, HomeButton, ArcGISDynamicMapServiceLayer, Tiled,
										      TimeExtent, TimeSlider, esriConfig, Point, Extent,
										      Query, QueryTask,
										      arrayUtils, dom, html) {


		/**
		 * For Story Maps
		 *
		 */
		app.controller('StoryMapController',
			       ['$rootScope', '$scope', '$attrs', '$sce', '$timeout', 'storyEvents',
				function StoryMapController($rootScope, $scope, $attrs, $sce, $timeout, storyEvents) {
			var self = this; // Reference to 'this' to use in functions
			var mapDiv = [];
			var layers = [];

			// @todo Resolve
			$scope.event = { name: 'Loading...', content: '' };

			this.init = function (element) {
			    if (!$attrs.id) { throw new Error('\'id\' is required for a map.'); }

			    self.$element = element;
			    self.createDiv();
			    self.createMap();
			};

			this.createDiv = function () {
			    mapDiv = document.createElement('div');
			    mapDiv.setAttribute('id', $attrs.id);
			    self.$element.removeAttr('id');
			    self.$element.append(mapDiv);
			};

			/**
			 * This extends the functionality of the map in order to provide a "story map" interface
			 *
			 */

			/**
			 * Structuring the data for the events (data in relation to the geospatial features)
			 *
			 */
			this.step = function(event) {

			    if( self.currentStep > 0) {
				var previousFeature = self.events[self.currentStep - 1];

				// Activate the stylized map layer
				self.map.getLayer( previousFeature.layerId ).hide();
			    }

			    var feature = self.events[self.currentStep];
			    var coords = feature.extent;

			    // @todo Refactor
			    feature.content = $sce.trustAsHtml(feature.template);

			    // Integrate the jQuery fancyboxes once the markup has been loaded
			    // This should be listening for some event to be propagated, but no time to implement this
			    $timeout(function() {
				    $scope.event = feature;
				    $('.fancy').fancybox();
				});


			    // @todo Abstract
			    if(coords.constructor == Object) {
				self.map.setExtent( new Extent(coords) );
			    } else {
				// This has been disabled in compliance with FOOD-75
				/*
				if( typeof(feature.zoom) === 'number' ) {
				    self.map.centerAndZoom(new Point( coords ),  feature.zoom);
				} else {
				    self.map.centerAt(coords);
				}
				*/
				self.map.centerAt(coords);
			    }

			    // Create another fancybox for when users land on a given event
			    // This is an anti-pattern for Angular, as the Controller shouldn't be manipulating the DOM
			    // It's probably best to implement this as a separate Directive
			    $.fancybox.open( feature.image );

			    // Activate the stylized map layer
			    self.map.getLayer( feature.layerId ).show();
			};

			this.nextStep = function(event) {
			    if(self.currentStep == self.events.length - 1) {
				self.currentStep = 0;
			    } else {
				self.currentStep++;
			    }

			    return self.step();
			};

			this.prevStep = function() {
			    if(self.currentStep == 0) {
				self.currentStep = self.events.length - 1 ;
			    } else {
				self.currentStep = self.currentStep - 1;
			    }

			    return self.step();
			};

			this.delay = 5 * 1000;
			this.play = function() {
			    var mapTimeoutID = window.setTimeout(function() {
				    self.play();
				}, self.delay);

			    $(window).data('mapTimeoutID', mapTimeoutID);
			    self.nextStep();
			};
			this.pause = function() {
			    var mapTimeoutID = $(window).data('mapTimeoutID');

			    window.clearTimeout(mapTimeoutID);
			    $(window).data('mapTimeoutID', null);
			};

			this.updateState = function(event) {
			    var mapTimeoutID = $(window).data('mapTimeoutID');

			    if(mapTimeoutID == undefined) {
				self.play();
				$(event.target).removeClass('glyphicon-play').addClass('glyphicon-pause');
			    } else {
				self.pause();
				$(event.target).removeClass('glyphicon-pause').addClass('glyphicon-play');
			    }
			};

			/**
			 * Handler for initially adding the layer results
			 * There is much duplication of functionality between this and self.step()
			 * @todo Rafactor
			 *
			 */
			this.layersAddResult = function() {

			    // Work-around is necessary for styling
			    $('#map-home').appendTo('#map_root').show();

			    var feature = self.events[self.currentStep];
			    var coords = feature.extent;

				if(coords.constructor == Object) {
				    self.map.setExtent( new Extent(coords) ).then(function() {

					    // @todo Refactor
					    feature.content = $sce.trustAsHtml(feature.template);
					    $scope.event = feature;

					    // Integration for the jQuery fancybox
					    // This delay is necessary, as there does not appear to be an immediately available Promise or event which can be used
					    // @todo Refactor
					    $timeout(function() {
						    $('.fancy').fancybox();
						});

					    dojo.query('#next-step').onclick(self.nextStep);
					    dojo.query('#prev-step').onclick(self.prevStep);
					    dojo.query('#play-pause').onclick(self.updateState);

					    $.fancybox.open( feature.image );

					    // Activate the stylized map layer
					    self.map.getLayer( feature.layerId ).show();
					});
				} else {
				    self.map.centerAndZoom(new Point( coords ), initialZoom).then(function() {
					    dojo.byId('location').textContent = feature.name;
					    dojo.query('#next-step').onclick(self.nextStep);
					    dojo.query('#prev-step').onclick(self.prevStep);
					    dojo.query('#play-pause').onclick(self.updateState);
					});
				}
			};
			//$scope.layersAddResult = this.layersAddResult;

			this.defaultExtent = new Extent({
				xmin: -295.10893287781346,
				xmax: 295.1089328778138,
				ymin: -49.658833917872954,
				ymax: 140.06463875093743,
				spatialReference: { wkid: 4326 }
			    });

			this.createMap = function () {
			    var options = {
				zoom: $attrs.zoom ? parseInt($attrs.zoom) : 1,
				logo: false,
				extent: this.defaultExtent
			    };

			    // Dojo indexes widgets using the @id attribute of each element
			    // Hence, the element must have its widgets destroyed upon loading
			    // Please see https://bugs.dojotoolkit.org/ticket/5438
			    dijit.registry.forEach(function(w) {
				    if(w.id == 'map-home') {
					w.destroyRecursive();
				    }
				});

			    self.map = new Map($attrs.id, options);
			    self.map.on('load', function (map) {

				    // This can fail if the Map itself isn't initialized
				    // The Esri API doesn't give me a Promise, or an event ("load" or "layers-add-result" still triggers the failure)
				    // Further, no consistent $timeout delay could be identified which suffices across browsers
				    // For the moment, this will have to suffice
				    while( $('#map_zoom_slider').length < 0 ) {
					// no-op
				    };

				    self.homeButton = new HomeButton({
					    map: self.map
					}, "map-home");
				    self.homeButton.startup();
				});

			    self.map.on("layers-add-result", self.layersAddResult );

			    // Work-around
			    self.map.addLayers(layers);

			    $scope.map = self.map;

			    // This triggers errors which relate to the Dojo/AngularJS integration
			    /*
			    $scope.map.on('load', function () { $rootScope.$broadcast('map-load'); });
			    $scope.map.on('click', function (e) { $rootScope.$broadcast('map-click', e); });
			    */
			};

			/**
			 * Adding additional layers to the map
			 *
			 */
			$scope.addLayer = function (layer) {
			    if ($scope.map) {
				$scope.map.addLayer(layer);
			    } else {
				layers.push(layer);
			    }
			};

			// This introduces a race condition
			// @todo Refactor
			storyEvents.then(function(promise) {
				// @todo Refactor
				if(self.hasOwnProperty('map')) {
				    self.events = promise.data;

				    var initialZoom = 0.1;

				    self.currentStep = 0;
				    var feature = self.events[self.currentStep];
				    var coords = feature.extent;

				    // @todo Refactor
				    feature.content = $sce.trustAsHtml(feature.template);
				    $scope.event = feature;

				    if(self.map.extent == self.defaultExtent) {
					if(JSON.stringify(self.map.extent) == JSON.stringify(self.defaultExtent)) {
					    self.layersAddResult();
					}
				    }
				}
			    });
		}]);

		app.directive('storyMap', function() {
			return {
			    restrict: 'EA',
				controller: 'StoryMapController',
				link: function ($scope, element, attrs, ctrl) {
				    ctrl.init(element);
			    }
			};
		    });

		/**
		 * Define the StoryLayerController and storyLayer Directive
		 * This permits one to insert ArcGISDynamicMapServiceLayer instances for any given map
		 *
		 */
		app.controller('StoryLayerController', ['$scope', '$attrs', function ($scope, $attrs) {
			    this.init = function() {
				if (!$attrs.url) { throw new Error('\'url\' is required for a story layer.'); }

				if(!$attrs.layerid) {
				    var layer = new ArcGISDynamicMapServiceLayer($attrs.url);
				    $scope.addLayer(layer);
				} else {
				    var layer = new ArcGISDynamicMapServiceLayer($attrs.url, { "id": $attrs.layerid, "visible": false });
				    $scope.addLayer(layer);
				}
			    };
    			}]);

		app.directive('storyLayer', function () {
			return {
			    restrict: 'EA',
			    replace: true,
			    require: ['storyLayer', '^^storyMap'],
			    controller: 'StoryLayerController',
			    link: function (scope, element, attrs, ctrls) {
			        ctrls[0].init();
			    }
			};
		    });


		// Bootstrap the application
		angular.bootstrap(document, ['purefood']);
	    });
}(window.require, window.angular, window.app));
