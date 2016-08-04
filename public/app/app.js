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
	      state('/contact', {
	       url: '/contact',
			  templateUrl: 'app/partials/contact.html',
			  controller: 'ContactCtrl'
	      }).
	      state('/copyright', {
	       url: '/copyright',
			  templateUrl: 'app/partials/copyright.html'
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
 * The controller for the contact form
 *
 */
app.controller('ContactCtrl', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
	    $scope.message = {};
	    $scope.status = null;

	    $scope.submit = function() {

		// POST to the endpoint
		$http.post('/contact', $scope.message).success(function(response) {
			$scope.status = response;

			// DOM manipulation should be relocated from the Controller
			$('#status').addClass('alert alert-success');

			$timeout(function() {
				$location.path( "/" );
			    }, 750);
		    });
	    };
	}]);

/**
 * The controller for the landing page
 *
 */
app.controller('ChaptersCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	    $http.get('data/chapters.json').success(function(data) {
		    //$scope.chapters = data;

		    var chapters = [];
		    for (i in data) {
			chapter = data[i];

			//chapter.content = $sce.trustAsHtml(chapter.title);
			//chapter.content = $sce.trustAsHtml(chapter.subtitle);
			//console.log(chapter.content);
			//chapter.content = $sce.trustAsHtml(chapter.content);
			chapters.push(chapter);
			//$scope.chapters = 
		    }

		    $scope.chapters = chapters;
		});
	}]);

/**
 * Controller for the Drupal authentication
 *
 */
app.controller('UserLoginCtrl', ['$scope', 'drupal', function($scope, drupal) {

	    $scope.submit = function(user) {

		drupal.user_login(user.name, user.pass).then(function(data) {
			
			// @todo Integrate with Drupal
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

/**
 * Integration of AngularJS with the Esri JavaScript API 3.17 Dojo (release)
 * @param {Object} require - the Dojo Require Object
 * @param {Object} angular - the AngularJS Object
 * @param {Object} app - the AngularJS Module
 *
 */
(function (require, angular, app) {
    'use strict';

    require(["esri/map", "esri/dijit/HomeButton", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer",
	     "esri/TimeExtent", "esri/dijit/TimeSlider", "esri/config", "esri/geometry/Point", "esri/geometry/Extent",
	     "esri/tasks/query", "esri/tasks/QueryTask", "esri/SpatialReference",
	     "dojo/_base/array", "dojo/dom", "dojo/html", "dojo/domReady!"], function(Map, HomeButton, ArcGISDynamicMapServiceLayer, Tiled,
										      TimeExtent, TimeSlider, esriConfig, Point, Extent,
										      Query, QueryTask, SpatialReference,
										      arrayUtils, dom, html) {


		/**
		 * For the Oleomargarine Legislation interface
		 *
		 */
		app.controller('MargarineLegislationController',
			       ['$rootScope', '$scope', '$attrs', '$sce', '$timeout',
				function MargarineLegislationController($rootScope, $scope, $attrs, $sce, $timeout) {

				    var mapOptions = { extent: new Extent({xmin: -143.37092112950089,
									   ymin: 14.993390205927994,
									   xmax: -50.14609136547047,
									   ymax: 49.92541072640776,
									   spatialReference: { wkid: 4326 }}) };

				    var map = new esri.Map("margarine-legislation-map", mapOptions);

				    $(document).data('map', map);

				    // Please see https://bugs.dojotoolkit.org/ticket/5438
				    dijit.registry.forEach(function(w) {
					    if(w.id == 'margarine-legislation-home') {
						w.destroyRecursive();
					    }
					});

				    /*
				    var homeButton = new HomeButton({
					    map: map
					}, "margarine-legislation-home");
				    homeButton.startup();
				    */

				    var layers = [];

				    var firstLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/griffinj/OleoLeg_normal_1877_1889/MapServer");
				    var lastLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/griffinj/oleoleg_normal_1891_1899/MapServer");

				    layers.push(new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/NorthAmerica_base/MapServer"));
				    layers.push(firstLayers);
				    layers.push(lastLayers);

				    // Work-around is necessary for styling
				    map.on("layers-add-result", function() {
					    $('#map-home').appendTo('#map_root').show();
					});
				    map.addLayers(layers);

				    var timeSlider = $(document).data('timeSlider');
				    timeSlider = new TimeSlider({
					    style: "width: 100%;"
					}, $('.time-slider-esri')[0] );
				    
				    $(document).data('timeSlider', timeSlider);

				    map.setTimeSlider(timeSlider);
				    var timeExtent = new TimeExtent();
				    timeExtent.startTime = new Date("1/1/1877 UTC");
				    timeExtent.endTime = new Date("12/31/1899 UTC");
				    timeSlider.setThumbCount(1);
				    timeSlider.createTimeStopsByTimeInterval(timeExtent, 1, "esriTimeUnitsYears");
				    timeSlider.setThumbIndexes([0]);
				    timeSlider.setThumbMovingRate(2000);
				    timeSlider.startup();

				    var labels = arrayUtils.map(timeSlider.timeStops, function(timeStop, i) {
					    return timeStop.getUTCFullYear();
					});

				    timeSlider.setLabels(labels);

				    $(document).data('timeSlider', timeSlider);

				    var TIME_STEPS_MAX = 23;

				    /*
				      var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
				      value: 0,
				      max: TIME_STEPS_MAX,
				      tooltip: 'hide' }).on('slide', function(e) {
				      var slider = $(document).data('timeSlider');
				      slider.setThumbIndexes( [e.value] );
				      $(document).data('hiddenSliderValue', e.value);
				      });
				    */
				    //var tickValues = Array.apply(null, Array(23)).map(function (_, i) { return i + 1877; });
				    var tickValues = Array.apply(null, Array(23)).map(function (_, i) { return i; });
				    $(document).data('tickValues', tickValues);
				    var tickLabels = Array.apply(null, Array(23)).map(function (_, i) { return (i + 1877).toString(); });

				    var sliderElements = $('#input-time-slider');
				    if( sliderElements.length == 0 ) {
					throw "Failed to load the element for the time slider interface";
				    }

				    var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
										       value: 0,
										       max: TIME_STEPS_MAX,
										       ticks: tickValues,
										       ticks_labels: tickLabels,
										       tooltip: 'hide' }).on('slide', function(e) {
											       var slider = $(document).data('timeSlider');
											       slider.setThumbIndexes( [e.value + 1] );
											       $(document).data('hiddenSliderValue', e.value + 1);
											   });

				    $(document).data('timeControl', timeControl);
				    var hiddenSliderValue = $(document).data('hiddenSliderValue', 0);

				    $('#next-step').click(function() {
					    var control = $(document).data('timeControl');
					    var tickValues = $(document).data('tickValues');

					    if( control.slider('getValue') < tickValues[tickValues.length - 1] ) {
						control.slider('setValue', control.slider('getValue') + 1, true);
					    }
					});
				    $('#prev-step').click(function() {
					    var control = $(document).data('timeControl');
					    if( control.slider('getValue') > 0 ) {
						control.slider('setValue', control.slider('getValue') - 1, true);
					    }
					});
				    
				    var play = $('#play-pause').click(function(e) {
					    var hiddenSlider = $(document).data('timeSlider');
					    var control = $(document).data('timeControl');
					    if(hiddenSlider.playing) {
						$(this).removeClass('glyphicon-pause').addClass('glyphicon-play');
						hiddenSlider.pause();

						var timeoutId = $(document).data('timeSlider.timeoutId');
						window.clearTimeout(timeoutId);
					    } else {
						$(this).removeClass('glyphicon-play').addClass('glyphicon-pause');
						hiddenSlider.play();
						var timeoutHandler = function(hiddenSlider, control) {
						    
						    //control.slider('setValue', hiddenSlider.thumbCount);
						    var hiddenSliderValue = $(document).data('hiddenSliderValue');
						    hiddenSliderValue++;
						    control.slider('setValue', hiddenSliderValue);
						    $(document).data('hiddenSliderValue', hiddenSliderValue);
						    
						    if(control.slider('getValue') <= TIME_STEPS_MAX) {
							var timeoutId = window.setTimeout(timeoutHandler, hiddenSlider.thumbMovingRate, hiddenSlider, control);
							$(document).data('timeSlider.timeoutId', timeoutId);
						    }
						};
						var timeoutId = window.setTimeout(timeoutHandler, hiddenSlider.thumbMovingRate, hiddenSlider, control);
						$(document).data('timeSlider.timeoutId', timeoutId);
					    }
					});
				}]);

		/**
		 * For the Butter and Oleomargarine Production interface
		 *
		 */
		app.controller('MargarineProductionController',
			       ['$rootScope', '$scope', '$attrs', '$sce', '$timeout',
				function MargarineProductionController($rootScope, $scope, $attrs, $sce, $timeout) {

				    var mapOptions = { extent: new Extent({xmin: -143.37092112950089,
									   ymin: 14.993390205927994,
									   xmax: -50.14609136547047,
									   ymax: 49.92541072640776,
									   spatialReference: { wkid: 4326 }})};
				    var map = new esri.Map("margarine-production-map", mapOptions);
				    
				    // Please see https://bugs.dojotoolkit.org/ticket/5438
				    dijit.registry.forEach(function(w) {
					    if(w.id == 'margarine-production-home') {
						w.destroyRecursive();
					    }
					});
				    /*
				    var homeButton = new HomeButton({
					    map: map
					}, "margarine-production-home");
				    homeButton.startup();
				    */
				    
				    $(document).data('map', map);
				    var layers = [];
				    var dairyLayers = [];
				    var oleoLayers = [];
				    var options = { 'visible': false };

				    layers.push(new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/NorthAmerica_base/MapServer"));
				    
				    dairyLayers.push( new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/ButterProd_1870_v4/MapServer") );
				    dairyLayers.push( new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/ButterProd_1880_v4/MapServer", options) );
				    dairyLayers.push( new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/ButterProd_1890_v4/MapServer", options) );
				    dairyLayers.push( new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/ButterProd_1900_v4/MapServer", options) );

				    $(document).data('dairyLayers', dairyLayers);

				    var layers = layers.concat(dairyLayers);

				    oleoLayers.push( new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/OleoProd_1880_v2/MapServer") );
				    oleoLayers.push( new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/OleoProd_1890_v2/MapServer", options) );
				    oleoLayers.push( new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/OleoProd_1900_v2/MapServer", options) );

				    $(document).data('oleoLayers', oleoLayers);

				    var layers = layers.concat(oleoLayers);

				    $(document).data('layers', layers);

				    var timeSlider = $(document).data('timeSlider');
				    timeSlider = new TimeSlider({
					    style: "width: 100%;"
					}, $('.time-slider-esri')[0] );
				    
				    $(document).data('timeSlider', timeSlider);

				    var timeExtent = new TimeExtent();
				    timeExtent.startTime = new Date("1/1/1877 UTC");
				    timeExtent.endTime = new Date("12/31/1899 UTC");
				    timeSlider.setThumbCount(1);
				    timeSlider.createTimeStopsByTimeInterval(timeExtent, 1, "esriTimeUnitsYears");
				    timeSlider.setThumbIndexes([0]);
				    timeSlider.setThumbMovingRate(2000);

				    //timeSlider.startup();

				    var labels = arrayUtils.map(timeSlider.timeStops, function(timeStop, i) {
					    return timeStop.getUTCFullYear();
					});

				    timeSlider.setLabels(labels);

				    $(document).data('timeSlider', timeSlider);

				    // Work-around is necessary for styling
				    map.on("layers-add-result", function() {
					    $('#map-home').appendTo('#map_root').show();
					    map.setTimeSlider(timeSlider);
					});
				    map.addLayers(layers);

				    var TIME_STEPS_MAX = 2;
				    var tickValues = Array.apply(null, Array(4)).map(function (_, i) { return i; });
				    var tickLabels = Array.apply(null, Array(4)).map(function (_, i) { return (i*10 + 1870).toString(); });

				    /**
				     * Ensure that the #input-time-slider Element is properly loaded
				     *
				     */
				    if( $("#input-time-slider").length == 0 ) {
					throw "Failed to load the element for the Bootstrap UI Slider widget";
				    } else {
					var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
											   value: 0,
											   ticks: tickValues,
											   ticks_labels: tickLabels,
											   tooltip: 'hide' }).on('slide', function(e) {
												   var layers = $(document).data('layers');
												   var dairyLayers = $(document).data('dairyLayers');
												   var oleoLayers = $(document).data('oleoLayers');
											       
												   //var value = e.value.oldValue < e.value.newValue ? e.value.oldValue : e.value.newValue;
												   var value = e.value;

												   //var layer = dairyLayers[ (dairyLayers.length - 1) - value ];
												   var dairyLayer = dairyLayers[ value ];
												   
												   if(dairyLayer.visible) {
												       //dairyLayer.setVisibility(false);
												       // Set all other dairyLayers as invisible
												       $.each(dairyLayers.slice(value + 1), function(i, newerDairyLayer) {
													       newerDairyLayer.setVisibility(false);
													   });
												   } else {
												       //dairyLayer = dairyLayers[ (dairyLayers.length - 1) - value ];
												       dairyLayer.setVisibility(true);
												   }

												   if( value == 0 || value == 1 ) {
												       value = 0;
												   }
												   var oleoLayer = oleoLayers[ value ];

												   if(oleoLayer.visible) {
												       // Set all other dairyLayers as invisible
												       $.each(oleoLayers.slice(value + 1), function(i, newerOleoLayer) {
													       newerOleoLayer.setVisibility(false);
													   });
												   } else {
												       oleoLayer.setVisibility(true);
												   }
												   
											   });

				    $(document).data('timeControl', timeControl);

				    var hiddenSliderValue = $(document).data('hiddenSliderValue', 0);

				    var backward = $('#backward').click(function(e) {

					    var map = $(document).data('map', map);
					    var control = $(document).data('timeControl');
					    control.slider('setValue', control.slider('getValue') - 1, true );
					});
				    var forward = $('#forward').click(function(e) {
		    
					    var map = $(document).data('map', map);
					    var control = $(document).data('timeControl');
					    control.slider('setValue', control.slider('getValue') + 1, true );
					});
				    var play = $('#play-pause').click(function(e) {
					    var hiddenSlider = $(document).data('timeSlider');
					    var control = $(document).data('timeControl');
					    if(hiddenSlider.playing) {
						$(this).removeClass('glyphicon-pause').addClass('glyphicon-play');
						hiddenSlider.pause();

						var timeoutId = $(document).data('timeSlider.timeoutId');
						window.clearTimeout(timeoutId);
					    } else {
						$(this).removeClass('glyphicon-play').addClass('glyphicon-pause');
						hiddenSlider.play();
						var timeoutHandler = function(hiddenSlider, control) {

						    //control.slider('setValue', hiddenSlider.thumbCount);
						    var hiddenSliderValue = $(document).data('hiddenSliderValue');
						    hiddenSliderValue++;
						    control.slider('setValue', hiddenSliderValue);
						    $(document).data('hiddenSliderValue', hiddenSliderValue);

						    if(control.slider('getValue') <= TIME_STEPS_MAX) {
							var timeoutId = window.setTimeout(timeoutHandler, hiddenSlider.thumbMovingRate, hiddenSlider, control);
							$(document).data('timeSlider.timeoutId', timeoutId);
						    }
						};
						var timeoutId = window.setTimeout(timeoutHandler, hiddenSlider.thumbMovingRate, hiddenSlider, control);
						$(document).data('timeSlider.timeoutId', timeoutId);
					    }
					});

				    }

				}]);

		/*
		// Please see https://bugs.dojotoolkit.org/ticket/5438
		dijit.registry.forEach(function(w) {
			if(w.id == 'map-home') {
			    w.destroyRecursive();
			}
		    });
		*/

		/**
		 * For the Cottonseed Oil Production interface
		 *
		 */
		app.controller('CottonseedProductionController',
			       ['$rootScope', '$scope', '$attrs', '$sce', '$timeout',
				function CottonseedProductionController($rootScope, $scope, $attrs, $sce, $timeout) {


				    //var centerPoint = new Point(1094878.5219291016, -358291.9638169871, new SpatialReference({ 'wkid': 102010 }));
				    //var centerPoint = new Point(1194878.5219291016, -358291.9638169871, new SpatialReference({ 'wkid': 102010 }));
				    //var centerPoint = new Point(1894878.5219291016, -688291.9638169871, new SpatialReference({ 'wkid': 102010 }));
				    var centerPoint = new Point(994878.5219291016, -688291.9638169871, new SpatialReference({ 'wkid': 102010 }));
				    var options = { 'minScale': 7865829.873816019,
						    'center': centerPoint };
				    var map = new esri.Map("cottonseed-production-map", options);

				    // Please see https://bugs.dojotoolkit.org/ticket/5438
				    dijit.registry.forEach(function(w) {
					    if(w.id == 'cottonseed-production-home') {
						w.destroyRecursive();
					    }
					});
				    /*
				    var homeButton = new HomeButton({
					    map: map
					}, "cottonseed-production-home");
				    homeButton.startup();
				    */

				    $(document).data('map', map);
				    //$(document).data('homeButton', homeButton);
				    
				    var options = { 'visible': false };
				    var layers = [];
				    layers.push(new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/CottonProduction_1860_v2/MapServer"));

				    layers.push(new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/CottonProduction_1870_v2/MapServer", options));
				    layers.push(new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/CottonProduction_1880_v2/MapServer", options));
				    layers.push(new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/CottonProduction_1890_v2/MapServer", options));
				    layers.push(new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/clarkjh/CottonProduction_1900_v2/MapServer", options));

				    $(document).data('layers', layers);
				    
				    map.on("pan-end", function(event) {
					    /*
					      if( event.extent.xmin < -99610.2442405615 && event.delta.x > 0 ) {
					      event.target.setExtent( new Extent(-99610.2442405615, event.extent.ymin, 2489367.2880987646, event.extent.ymax, new SpatialReference({ 'wkid': 102010 })) );
					      }
					    */
					    
					    // -479241.64034015604
					    // 3931194.2166652437

					    // if( event.extent.xmin < -479241.64034015604
					    if( event.extent.xmin < -486907.03314981103 && event.delta.x > 0 ) {
						//event.target.setExtent( new Extent(-479241.64034015604, event.extent.ymin, 3931194.2166652437, event.extent.ymax, new SpatialReference({ 'wkid': 102010 })) );
						event.target.setExtent( new Extent(-486907.03314981103, event.extent.ymin, 1991901.2424942257, event.extent.ymax, new SpatialReference({ 'wkid': 102010 })) );
					    }
					    
					});

				    // Work-around is necessary for styling
				    map.on("layers-add-result", function() {
					    $('#map-home').appendTo('#map_root').show();
					});
				    map.addLayers(layers);

				    var TIME_STEPS_MAX = 4;
				    var tickValues = Array.apply(null, Array(5)).map(function (_, i) { return i; });
				    var tickLabels = Array.apply(null, Array(5)).map(function (_, i) { return (i*10 + 1860).toString(); });
				    
				    var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
										       value: 0,
										       max: TIME_STEPS_MAX,
										       ticks: tickValues,
										       ticks_labels: tickLabels,
										       tooltip: 'hide' }).on('slide', function(e) {
											       var layers = $(document).data('layers');
											       // var value = e.value.oldValue < e.value.newValue ? e.value.oldValue : e.value.newValue;
											       var value = e.value;

											       //var layer = layers[ (layers.length - 1) - value ];
											       var layer = layers[value];
											       
											       if(layer.visible) {
												   //layer.setVisibility(false);
												   // Set all other layers as invisible
												   $.each(layers.slice(value + 1), function(i, newerLayer) {
													   newerLayer.setVisibility(false);
												       });
											       } else {
												   //layer = layers[ (layers.length - 1) - value ];
												   layer.setVisibility(true);
											       }

											   });
				    $(document).data('timeControl', timeControl);
				    var hiddenSliderValue = $(document).data('hiddenSliderValue', 0);
				    
				    var backward = $('#backward').click(function(e) {
					    
					    //var map = $(document).data('map', map);
					    var control = $(document).data('timeControl');
					    
					    console.log('trace');
					    console.log( control.slider('getValue') );
					    
					    control.slider('setValue', (control.slider('getValue') - 1), true );
					});
				    var forward = $('#forward').click(function(e) {

					    //var map = $(document).data('map', map);
					    var control = $(document).data('timeControl');
					    control.slider('setValue', control.slider('getValue') + 1, true );
					});
				    var play = $('#play-pause').click(function(e) {

					    /*
					      var hiddenSlider = $(document).data('timeSlider');
					      var control = $(document).data('timeControl');
					      if(hiddenSlider.playing) {
					      $(this).removeClass('glyphicon-pause').addClass('glyphicon-play');
					      hiddenSlider.pause();

					      var timeoutId = $(document).data('timeSlider.timeoutId');
					      window.clearTimeout(timeoutId);
					      } else {
					      $(this).removeClass('glyphicon-play').addClass('glyphicon-pause');
					      hiddenSlider.play();
					      var timeoutHandler = function(hiddenSlider, control) {
					      
					      //control.slider('setValue', hiddenSlider.thumbCount);
					      var hiddenSliderValue = $(document).data('hiddenSliderValue');
					      hiddenSliderValue++;
					      control.slider('setValue', hiddenSliderValue);
					      $(document).data('hiddenSliderValue', hiddenSliderValue);
					      
					      if(control.slider('getValue') <= TIME_STEPS_MAX) {
					      var timeoutId = window.setTimeout(timeoutHandler, hiddenSlider.thumbMovingRate, hiddenSlider, control);
					      $(document).data('timeSlider.timeoutId', timeoutId);
					      }
					      };
					      var timeoutId = window.setTimeout(timeoutHandler, hiddenSlider.thumbMovingRate, hiddenSlider, control);
					      $(document).data('timeSlider.timeoutId', timeoutId);
					      }
					    */
					});
				}]);

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
				// ...and now this has been enabled once again

				if( typeof(feature.zoom) === 'number' ) {
				    self.map.centerAndZoom(new Point( coords ),  feature.zoom);
				} else {
				    self.map.centerAt(coords);
				}

				//self.map.centerAt(coords);
			    }

			    // Create another fancybox for when users land on a given event
			    // This is an anti-pattern for Angular, as the Controller shouldn't be manipulating the DOM
			    // It's probably best to implement this as a separate Directive
			    //$.fancybox.open( feature.image );

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

					    //$.fancybox.open( feature.image );

					    // Activate the stylized map layer
					    /*
					    if( self.map.getLayer( feature.layerId ) != undefined ) {
						self.map.getLayer( feature.layerId ).show();
					    }
					    */
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

			this.zoom = function( anchor, extent, zoomFactor ) {
			    // Iterate through the base maps

			    // If the specific extent doesn't fall within the current extent, do not render it
			    
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

			    // Remove?
			    $(document).data('map', self.map);

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
			    self.map.on("zoom", self.zoom );

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

				var options = {};

				/*
				if(!$attrs.layerid) {
				    var layer = new ArcGISDynamicMapServiceLayer($attrs.url);
				    $scope.addLayer(layer);
				} else {
				    var layer = new ArcGISDynamicMapServiceLayer($attrs.url, { "id": $attrs.layerid, "visible": false });
				    $scope.addLayer(layer);
				}
				*/
				if($attrs.hasOwnProperty('layerId')) {
				    options['id'] = $attrs.layerId;
				}
				if($attrs.hasOwnProperty('visible')) {
				    options['visible'] = String($attrs.visible) == "true";
				}

				var layer = new ArcGISDynamicMapServiceLayer($attrs.url, options);
				//var layer = new ArcGISDynamicMapServiceLayer($attrs.url);
				if($attrs.hasOwnProperty('minScale')) {
				    /*
				    layer. = $attrs.maxscale;
				    layer. = $attrs.maxscale;
				    */
				    layer.setMinScale(window.parseFloat($attrs.minScale));
				}

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
		angular.bootstrap(document, ['purefood']);
	    });
}(window.require, window.angular, window.app));
