/**
 *
 *
 */

var map;

// Please see https://bugs.dojotoolkit.org/ticket/5438
dijit.registry.forEach(function(w) {

	if(w.id == 'map-home') {
	    w.destroyRecursive();
	}
    });

require(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/dijit/HomeButton",
	 "esri/TimeExtent", "esri/dijit/TimeSlider", "esri/geometry/Point", "esri/SpatialReference",
	 "dojo/_base/array", "dojo/dom", "dojo/domReady!"], function(Map, ArcGISDynamicMapServiceLayer, HomeButton,
								     TimeExtent, TimeSlider, Point, SpatialReference,
								     arrayUtils, dom) {

	    //var mapOptions = { 'scale': 30609488.52368693, 'center': new Point(-310339.4065735983, -1295580.8942135999, new SpatialReference({ 'wkid': 102003 })) };
	    var mapOptions = { 'scale': 30609488.52368693 };
	    map = new esri.Map("map", mapOptions);

	    $(document).data('map', map);

	    var homeButton = new HomeButton({
		    map: map
		}, "map-home");
	    homeButton.startup();
	    var layers = [];

	    var firstLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/griffinj/OleoLeg_normal_1877_1889/MapServer");
	    var lastLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/griffinj/oleoleg_normal_1891_1899/MapServer");

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

	    while( sliderElements.length == 0 ) {
		sliderElements = $('#input-time-slider');
	    }

	    var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
							       value: 0,
							       max: TIME_STEPS_MAX,
							       ticks: tickValues,
							       ticks_labels: tickLabels,
							       tooltip: 'hide' }).on('slide', function(e) {
								       var slider = $(document).data('timeSlider');
								       slider.setThumbIndexes( [e.value] );
								       $(document).data('hiddenSliderValue', e.value);
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
	});
