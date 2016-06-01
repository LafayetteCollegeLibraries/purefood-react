/**
 *
 *
 */

// Please see https://bugs.dojotoolkit.org/ticket/5438
dijit.registry.forEach(function(w) {

	if(w.id == 'map-home') {
	    w.destroyRecursive();
	}
    });

var map;
require(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/dijit/HomeButton",
	 "esri/TimeExtent", "esri/dijit/TimeSlider",
	 "dojo/_base/array", "dojo/dom", "dojo/domReady!"], function(Map, ArcGISDynamicMapServiceLayer, HomeButton,
								     TimeExtent, TimeSlider,
								     arrayUtils, dom) {

	    map = new esri.Map("map");
	    var homeButton = new HomeButton({
		    map: map
		}, "map-home");
	    homeButton.startup();
	    $(document).data('map', map);
	    $(document).data('homeButton', homeButton);
	    var layers = [];
	    var beetSugarLayers = [];
	    var glucoseLayers = [];

	    var firstBeetSugarLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/DairyProd_1880/MapServer");
	    var secondBeetSugarLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/DairyProd_1890/MapServer");
	    var lastBeetSugarLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/DairyProd_1900/MapServer");

	    beetSugarLayers.push(lastBeetSugarLayers);
	    beetSugarLayers.push(secondBeetSugarLayers);
	    beetSugarLayers.push(firstBeetSugarLayers);
	    $(document).data('beetSugarLayers', beetSugarLayers);

	    var layers = layers.concat(beetSugarLayers);

	    var firstGlucoseLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/OleoProd_1880/MapServer");
	    var secondGlucoseLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/OleoProd_1890/MapServer");
	    var lastGlucoseLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/OleoProd_1900/MapServer");

	    glucoseLayers.push(lastGlucoseLayers);
	    glucoseLayers.push(secondGlucoseLayers);
	    glucoseLayers.push(firstGlucoseLayers);
	    $(document).data('glucoseLayers', glucoseLayers);

	    var layers = layers.concat(glucoseLayers);

	    $(document).data('layers', layers);

	    // Work-around is necessary for styling
	    map.on("layers-add-result", function() {
		    $('#map-home').appendTo('#map_root').show();
		});
	    map.addLayers(layers);

	    var timeSlider = new TimeSlider({
		    style: "width: 100%;"
		}, dom.byId("time-slider-esri"));

	    map.setTimeSlider(timeSlider);
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

	    var TIME_STEPS_MAX = 2;

	    var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
							       value: 0,
							       max: TIME_STEPS_MAX,
							       tooltip: 'hide' }).on('change', function(e) {
								       var layers = $(document).data('layers');
								       var beetSugarLayers = $(document).data('beetSugarLayers');
								       var glucoseLayers = $(document).data('glucoseLayers');

								       var value = e.value.oldValue < e.value.newValue ? e.value.oldValue : e.value.newValue;

								       var layer = beetSugarLayers[ (beetSugarLayers.length - 1) - value ];
								       var glucoseLayer = glucoseLayers[ (glucoseLayers.length - 1) - value ];

								       if(layer.visible) {
									   layer.setVisibility(false);
									   glucoseLayer.setVisibility(false);
								       } else {
									   layer = beetSugarLayers[ (beetSugarLayers.length - 1) - value ];
									   glucoseLayer = glucoseLayers[ (glucoseLayers.length - 1) - value ];
									   layer.setVisibility(true);
									   glucoseLayer.setVisibility(true);
								       }
								   });
	    $(document).data('timeControl', timeControl);
	    var hiddenSliderValue = $(document).data('hiddenSliderValue', 0);

	    var backward = $('#backward').click(function(e) {

		    var map = $(document).data('map', map);
		    var control = $(document).data('timeControl');
		    control.slider('setValue', control.slider('getValue') - 1 );
		});
	    var forward = $('#forward').click(function(e) {

		    var map = $(document).data('map', map);
		    var control = $(document).data('timeControl');
		    control.slider('setValue', control.slider('getValue') + 1 );
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
	});
