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

	    var centerPoint = new Point(86, 384.20001220703125, new SpatialReference({ 'wkid': 102003 }));

	    var mapOptions = { 'scale': 17579831.258048493, 'center': centerPoint };
	    map = new esri.Map("map", mapOptions);

	    var homeButton = new HomeButton({
		    map: map
		}, "map-home");
	    homeButton.startup();
	    $(document).data('map', map);
	    var layers = [];
	    var dairyLayers = [];
	    var oleoLayers = [];
	    var options = { 'visible': false };


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
		    //$('#map-home').appendTo('#map_root').show();
		    map.setTimeSlider(timeSlider);
		});
	    map.addLayers(layers);


	    var TIME_STEPS_MAX = 2;
	    var tickValues = Array.apply(null, Array(4)).map(function (_, i) { return i; });
	    var tickLabels = Array.apply(null, Array(4)).map(function (_, i) { return (i*10 + 1870).toString(); });

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


								       /*
								       if(layer.visible) {
									   layer.setVisibility(false);
								       } else {
									   layer = dairyLayers[ (dairyLayers.length - 1) - value ];
									   layer.setVisibility(true);
								       }
								       */

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
	});
