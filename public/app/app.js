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
app.config(['$provide', '$routeProvider', '$stateProvider', '$urlRouterProvider',
						function($provide, $routeProvider, $stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise('/');

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
				state('/oil-exports', {
	      	url: '/oil-exports',
		    	templateUrl: 'app/partials/oil_exports.html'
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
				}).
				state('/', {
	      	url: '/',
			 		templateUrl: 'app/partials/home.html',
	      });
	}]);

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

app.controller('NavbarController',
	       ['$rootScope', '$scope', '$attrs',
		function NavbarController($rootScope, $scope, $attrs) {
		    $scope.override = function override($event) {
			$event.preventDefault();
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
 * Service for the Events in the Paraf's Itinerary interface
 *
 */
app.factory('parafEvents', ['$http', function($http) {
	    var deferred = $http.get('data/events.json').success(function(data) {
		    return data;
		});

	    return deferred;
	}]);

/**
 *
 */
app.controller('ParafController',
	       ['$rootScope', '$scope', '$attrs', '$sce', '$timeout', '$interval', 'parafEvents',
		function ParafController($rootScope, $scope, $attrs, $sce, $timeout, $interval, parafEvents) {
		    $scope.layers = [];
		    $scope.tickLabels = [];

		    this.initLayer = function initLayer() {
			$scope.layers.unshift({ src: $attrs.src });
		    };

		    this.addLabel = function initLayer() {
			$scope.tickLabels.unshift($attrs.value);
		    };

		    $scope.setEvent = function appendEventContent(event) {
			event.content = $sce.trustAsHtml(event.template);
			$scope.event = event;

			// Integrate the jQuery fancyboxes once the markup has been loaded
			// This should be listening for some event to be propagated, but no time to implement this
			$timeout(function() { $('.fancy').fancybox(); });
		    };

		    this.init = function init() {
			$scope.timeSteps = window.parseInt($attrs.timeSteps);
			$scope.currentLayer = $scope.layers[0];
			$scope.currentLayerIndex = 0;

			var tickValues = Array.apply(null, Array($scope.timeSteps)).map(function (_, i) { return i; });
			var tickLabels = $scope.tickLabels;

			$scope.setLayer = function setLayer(layerIndex) {
			    $scope.currentLayerIndex = layerIndex;

			    var layer = $scope.layers[layerIndex];
			    if(typeof layer != 'undefined') {
				$scope.currentLayer = layer;
			    }

			    var event = $scope.events[layerIndex];
			    if(typeof(event) != 'undefined') {
				/*
				event.content = $sce.trustAsHtml(event.template);
				$scope.event = event;

				// Integrate the jQuery fancyboxes once the markup has been loaded
				// This should be listening for some event to be propagated, but no time to implement this
				$timeout(function() { $('.fancy').fancybox(); });
				*/
				$scope.setEvent(event);
			    }
			};

			$scope.timeControl = $("#input-time-slider").slider({ id: 'time-slider',
									      value: 0,
									      max: $scope.timeSteps,
									      ticks: tickValues,
									      ticks_labels: tickLabels,
									      tooltip: 'hide' }).on('slide', function(e) {
										      $scope.setLayer(e.value);
										      $scope.$apply();
										  });


			// Work-around
			if( $('#time-slider .slider-tick').length > 0 ) {
			    $('#time-slider .slider-tick').click(function(e) {
				    $scope.setLayer( $scope.timeControl.slider('getValue') );
				    $scope.$apply();
				});
			}

			$scope.playing = false;
			$scope.event = { name: 'Loading...', content: '' };
			$scope.events = [];


		    };

		    $scope.prevLayer = function prevLayer() {
			if($scope.currentLayerIndex > 0) {
			    $scope.currentLayerIndex--;

			    $scope.timeControl.slider('setValue', $scope.currentLayerIndex);
			    $scope.setLayer($scope.currentLayerIndex);
			}
		    };

		    $scope.nextLayer = function nextLayer() {
			if($scope.currentLayerIndex < ($scope.timeSteps - 1)) {
			    $scope.currentLayerIndex++;

			    $scope.timeControl.slider('setValue', $scope.currentLayerIndex);
			    $scope.setLayer($scope.currentLayerIndex);
			}
		    };

		    $scope.animate = function animate($event) {
			if(!$scope.playing) {
			    $scope.playing = true;
			    this.animation = $interval(function() {
				    if($scope.currentLayerIndex > ($scope.timeSteps - 2)) {
					$interval.cancel(that.animation);

					$scope.playing = false;
					$($event.currentTarget).removeClass('glyphicon-pause').addClass('glyphicon-play');

					delete that;
				    } else {
					$scope.nextLayer();
				    }
				}, 2000);

			    $($event.currentTarget).removeClass('glyphicon-play').addClass('glyphicon-pause');

			    var that = this;
			} else {
			    $interval.cancel(this.animation);
			    $scope.playing = false;
			    $($event.currentTarget).removeClass('glyphicon-pause').addClass('glyphicon-play');
			}
		    };

		    // This introduces a race condition
		    // @todo Refactor
		    parafEvents.then(function(promise) {
			    $scope.events = promise.data;

			    // @todo Refactor
			    var event = $scope.events[0];
			    /*
			    event.content = $sce.trustAsHtml(event.template);
			    $scope.event = event;

			    // Integrate the jQuery fancyboxes once the markup has been loaded
			    // This should be listening for some event to be propagated, but no time to implement this
			    $timeout(function() { $('.fancy').fancybox(); });
			    */
			    $scope.setEvent(event);
			});
		}]);

app.directive('parafMap', function() {

	return {
	    restrict: 'EA',
		controller: 'ParafController',
		link: function ($scope, element, attrs, ctrl) {
		ctrl.init(element);
	    }
	};
    });

/*
app.controller('ParafLayerController',
	       ['$rootScope', '$scope', '$attrs',
		function ParafLayerController($rootScope, $scope, $attrs) {

		    this.init = function init() {
			/*
			console.log($attrs);
			$scope.timeSteps = window.parseInt($attrs.timeSteps);
			console.log($scope.timeSteps);
			* /
			$scope.layers.append($attrs.src);
		    };
		}]);
*/

app.directive('parafMapLayer', function () {
	return {
	    restrict: 'EA',
	    replace: true,
	    controller: 'ParafController',
	    link: function (scope, element, attrs, ctrl) {
		ctrl.initLayer();
	    }
	};
    });

app.directive('parafStepLabel', function () {
	return {
	    restrict: 'EA',
	    replace: true,
	    controller: 'ParafController',
	    link: function (scope, element, attrs, ctrl) {
		ctrl.addLabel();
	    }
	};
    });


/**
 * For the Cottonseed Oil Exports interface
 *
 */
app.controller('CottonseedExportsController',
	       ['$rootScope', '$scope', '$attrs', '$sce', '$timeout',
		function CottonseedExportsController($rootScope, $scope, $attrs, $sce, $timeout) {

		    var layers = [
				  { src: 'img/cottonseed_oil_exports.png' },
				  { src: 'img/cottonseed_oil_exports.png' }
				  ];
		    $scope.currentLayer = layers[0];

		    var TIME_STEPS_MAX = 2;
		    var tickValues = Array.apply(null, Array(2)).map(function (_, i) { return i; });
		    //var tickLabels = Array.apply(null, Array(23)).map(function (_, i) { return (i + 1885).toString(); });
		    var tickLabels = ['1900','1900'];

		    var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
								       value: 0,
								       max: TIME_STEPS_MAX,
								       ticks: tickValues,
								       ticks_labels: tickLabels,
								       tooltip: 'hide' }).on('slide', function(e) {
									       //var layerIndex = Math.floor(e.value / 5);
									       var layerIndex = e.value;
									       var layer = layers[layerIndex];
									       if(typeof layer != 'undefined') {
										   $scope.currentLayer = layer;
									       }
									       $scope.$apply();
									   });

			// Work-around
			if( $('#time-slider .slider-tick').length > 0 ) {
			    $('#time-slider .slider-tick').click(function(e) {
				    $scope.setLayer( $scope.timeControl.slider('getValue') );
				    $scope.$apply();
				});
			}

		}]);

/**
 * For the Glucose Exports interface
 *
 */
app.controller('GlucoseExportsController',
	       ['$rootScope', '$scope', '$attrs', '$sce', '$timeout',
		function GlucoseExportsController($rootScope, $scope, $attrs, $sce, $timeout) {

		    var layers = [{ src: 'img/glucose_exports_1885.png' },
				  { src: 'img/glucose_exports_1890.png' },
				  { src: 'img/glucose_exports_1895.png' },
				  { src: 'img/glucose_exports_1900.png' },
				  { src: 'img/glucose_exports_1905.png' }];
		    $scope.currentLayer = layers[0];

		    var TIME_STEPS_MAX = 23;
		    var tickValues = Array.apply(null, Array(23)).map(function (_, i) { return i; });
		    var tickLabels = Array.apply(null, Array(23)).map(function (_, i) { return (i + 1885).toString(); });

		    var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
								       value: 0,
								       max: TIME_STEPS_MAX,
								       ticks: tickValues,
								       ticks_labels: tickLabels,
								       tooltip: 'hide' }).on('slide', function(e) {
									       var layerIndex = Math.floor(e.value / 5);
									       var layer = layers[layerIndex];
									       if(typeof layer != 'undefined') {
										   $scope.currentLayer = layer;
									       }
									       $scope.$apply();
									   });

			// Work-around
			if( $('#time-slider .slider-tick').length > 0 ) {
			    $('#time-slider .slider-tick').click(function(e) {
				    $scope.setLayer( $scope.timeControl.slider('getValue') );
				    $scope.$apply();
				});
			}

		}]);

/**
 * For the Oleomargarine and Oleo Oil Exports interface
 *
 */
app.controller('MargarineExportsController',
	       ['$rootScope', '$scope', '$attrs', '$sce', '$timeout',
		function MargarineExportsController($rootScope, $scope, $attrs, $sce, $timeout) {

		    var layers = [
				  { src: 'img/margarine_exports_1885.png' },
				  { src: 'img/margarine_exports_1895.png' },
				  { src: 'img/margarine_exports_1905.png' }
				  ];
		    $scope.currentLayer = layers[0];

		    var TIME_STEPS_MAX = 3;
		    var tickValues = Array.apply(null, Array(3)).map(function (_, i) { return i; });
		    //var tickLabels = Array.apply(null, Array(20)).map(function (_, i) { return (i + 1877).toString(); });
		    var tickLabels = ['1885','1895','1905'];

		    var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
								       value: 0,
								       max: TIME_STEPS_MAX,
								       ticks: tickValues,
								       ticks_labels: tickLabels,
								       tooltip: 'hide' }).on('slide', function(e) {
									       var layerIndex = e.value;
									       var layer = layers[layerIndex];
									       if(typeof layer != 'undefined') {
										   $scope.currentLayer = layer;
									       }
									       $scope.$apply();
									   });

			// Work-around
			if( $('#time-slider .slider-tick').length > 0 ) {
			    $('#time-slider .slider-tick').click(function(e) {
				    $scope.setLayer( $scope.timeControl.slider('getValue') );
				    $scope.$apply();
				});
			}

		}]);

/**
 * For the Oleomargarine and Oleo Oil Exports interface
 *
 */
app.controller('MargarineLegislationController',
	       ['$rootScope', '$scope', '$attrs', '$sce', '$timeout',
		function MargarineLegislationController($rootScope, $scope, $attrs, $sce, $timeout) {

		    var layers = [
				  { src: 'img/OleoLeg_1877.jpg' },
				  { src: 'img/OleoLeg_1878.jpg' },
				  { src: 'img/OleoLeg_1879.jpg' },
				  { src: 'img/OleoLeg_1881.jpg' },
				  { src: 'img/OleoLeg_1882.jpg' },
				  { src: 'img/OleoLeg_1883.jpg' },
				  { src: 'img/OleoLeg_1884.jpg' },
				  { src: 'img/OleoLeg_1885.jpg' },
				  { src: 'img/OleoLeg_1886.jpg' },
				  { src: 'img/OleoLeg_1887.jpg' },
				  { src: 'img/OleoLeg_1888.jpg' },
				  { src: 'img/OleoLeg_1889.jpg' },
				  { src: 'img/OleoLeg_1891.jpg' },
				  { src: 'img/OleoLeg_1892.jpg' },
				  { src: 'img/OleoLeg_1893.jpg' },
				  { src: 'img/OleoLeg_1894.jpg' },
				  { src: 'img/OleoLeg_1895.jpg' },
				  { src: 'img/OleoLeg_1896.jpg' },
				  { src: 'img/OleoLeg_1897.jpg' },
				  { src: 'img/OleoLeg_1898.jpg' },
				  { src: 'img/OleoLeg_1899.jpg' }
				  ];
		    $scope.currentLayer = layers[0];

		    var TIME_STEPS_MAX = 20;
		    var tickValues = Array.apply(null, Array(20)).map(function (_, i) { return i; });
		    var tickLabels = Array.apply(null, Array(20)).map(function (_, i) { return (i + 1877).toString(); });

		    var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
								       value: 0,
								       max: TIME_STEPS_MAX,
								       ticks: tickValues,
								       ticks_labels: tickLabels,
								       tooltip: 'hide' }).on('slide', function(e) {
									       var layerIndex = e.value;
									       var layer = layers[layerIndex];
									       if(typeof layer != 'undefined') {
										   $scope.currentLayer = layer;
									       }
									       $scope.$apply();
									   });

			// Work-around
			if( $('#time-slider .slider-tick').length > 0 ) {
			    $('#time-slider .slider-tick').click(function(e) {
				    $scope.setLayer( $scope.timeControl.slider('getValue') );
				    $scope.$apply();
				});
			}

		}]);

// Bootstrap the application
//angular.bootstrap(document, ['purefood']);
