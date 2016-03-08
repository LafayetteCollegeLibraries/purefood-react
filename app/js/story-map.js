/**
 * The Story Map Directive
 * Derived primarily from the design pattern featured in http://justinchmura.com/2014/06/16/using-angularjs-esri-javascript-api/
 *
 */

var app = angular.module('pureFood', ['ngSanitize']);

(function (require, angular, app) {
    'use strict';

    require(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer",
	     "esri/TimeExtent", "esri/dijit/TimeSlider", "esri/config", "esri/geometry/Point", "esri/geometry/Extent",
	     "esri/tasks/query", "esri/tasks/QueryTask",
	     "dojo/_base/array", "dojo/dom", "dojo/html", "dojo/domReady!"], function(Map, ArcGISDynamicMapServiceLayer, Tiled,
										      TimeExtent, TimeSlider, esriConfig, Point, Extent,
										      Query, QueryTask,
										      arrayUtils, dom, html) {

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
		
		app.controller('StoryEventController',
			       ['$rootScope', '$scope', '$attrs',
				function StoryEventController($rootScope, $scope, $attrs) {

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

		/**
		 * For Story Maps
		 *
		 */
		app.controller('StoryMapController',
			       ['$rootScope', '$scope', '$attrs', '$sce', 'storyEvents',
				function StoryMapController($rootScope, $scope, $attrs, $sce, storyEvents) {
			
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
			//self.events = $attrs.events ? $attrs.events: { attrs: $attrs.events.attrs ? $attrs.events.attrs : [] };
			//self.events = $scope.events;

			
			this.step = function(event) {
			    var feature = self.events[self.currentStep];
			    var coords = feature.extent;

			    // @todo Refactor
			    feature.content = $sce.trustAsHtml(feature.template);
			    $scope.$apply(function() { $scope.event = feature; });

			    // @todo Abstract
			    if(coords.constructor == Object) {
				self.map.setExtent( new Extent(coords) );
			    } else {
				if( typeof(feature.zoom) === 'number' ) {
				    self.map.centerAndZoom(new Point( coords ),  feature.zoom);
				} else {
				    self.map.centerAt(coords);
				}
			    }
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

			this.layersAddResult = function() {
				
				var feature = self.events[self.currentStep];
				var coords = feature.extent;

				if(coords.constructor == Object) {
				    self.map.setExtent( new Extent(coords) ).then(function() {

					    // @todo Refactor
					    feature.content = $sce.trustAsHtml(feature.template);
					    $scope.event = feature;

					    dojo.query('#next-step').onclick(self.nextStep);
					    dojo.query('#prev-step').onclick(self.prevStep);
					    dojo.query('#play-pause').onclick(self.updateState);
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
			
			this.createMap = function () {
			    var options = {
				zoom: $attrs.zoom ? parseInt($attrs.zoom) : 1,
				logo: false
			    };

			    // 				basemap: $attrs.basemap ? $attrs.basemap : null,
			    
			    self.map = new Map($attrs.id, options);
			    self.map.on("layers-add-result", self.layersAddResult);

			    // Work-around
			    self.map.addLayers(layers);

			    $scope.map = self.map;
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

			// Can this introduce a race condition, or is this handled by Promises?
			storyEvents.then(function(promise) {
				self.events = promise.data;

				var initialZoom = 0.1;

				self.currentStep = 0;
				var feature = self.events[self.currentStep];
				var coords = feature.extent;

				// @todo Refactor
				feature.content = $sce.trustAsHtml(feature.template);
				$scope.event = feature;
			    });
		}]);

		app.directive('storyMap', function() {
			return {
			    restrict: 'EA',
				controller: 'StoryMapController',
				link: function (scope, element, attrs, ctrl) {
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
				//if (!$attrs.id) { throw new Error('\'id\' is required for a story layer.'); }
				if (!$attrs.url) { throw new Error('\'url\' is required for a story layer.'); }
				//var layer = new ArcGISDynamicMapServiceLayer($attrs.url, { id: $attrs.id });
				var layer = new ArcGISDynamicMapServiceLayer($attrs.url);
				$scope.addLayer(layer);
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
		angular.bootstrap(document, ['pureFood']);
	    });
}(window.require, window.angular, window.app));
