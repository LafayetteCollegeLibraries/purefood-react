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

require(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/dijit/HomeButton",
	 "esri/TimeExtent", "esri/dijit/TimeSlider", "esri/geometry/Point", "esri/geometry/Extent", "esri/SpatialReference",
	 "dojo/_base/array", "dojo/dom", "dojo/domReady!"], function(Map, ArcGISDynamicMapServiceLayer, HomeButton,
								     TimeExtent, TimeSlider, Point, Extent, SpatialReference,
								     arrayUtils, dom) {

	    //var centerPoint = new Point(1094878.5219291016, -358291.9638169871, new SpatialReference({ 'wkid': 102010 }));
	    //var centerPoint = new Point(1194878.5219291016, -358291.9638169871, new SpatialReference({ 'wkid': 102010 }));
	    //var centerPoint = new Point(1894878.5219291016, -688291.9638169871, new SpatialReference({ 'wkid': 102010 }));
	    var centerPoint = new Point(994878.5219291016, -688291.9638169871, new SpatialReference({ 'wkid': 102010 }));
	    var options = { 'minScale': 7865829.873816019,
			    'center': centerPoint };
	    var map = new esri.Map("map", options);
	    var homeButton = new HomeButton({
		    map: map
		}, "map-home");
	    homeButton.startup();
	    $(document).data('map', map);
	    $(document).data('homeButton', homeButton);

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

	    /*

	    var firstLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/griffinj/OleoLeg_normal_1877_1889/MapServer");
	    var lastLayers = new esri.layers.ArcGISDynamicMapServiceLayer("//geo.lafayette.edu/arcgis/rest/services/griffinj/oleoleg_normal_1891_1899/MapServer");

	    layers.push(firstLayers);
	    layers.push(lastLayers);
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


	    timeSlider.startup();

	    var labels = arrayUtils.map(timeSlider.timeStops, function(timeStop, i) {
		    return timeStop.getUTCFullYear();
		});

	    timeSlider.setLabels(labels);

	    $(document).data('timeSlider', timeSlider);

	    var TIME_STEPS_MAX = 23;

	    var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
							       value: 0,
							       max: TIME_STEPS_MAX,
							       tooltip: 'hide' }).on('slide', function(e) {
								       var slider = $(document).data('timeSlider');
								       slider.setThumbIndexes( [e.value] );
								       $(document).data('hiddenSliderValue', e.value);
								   });
	    $(document).data('timeControl', timeControl);
	    var hiddenSliderValue = $(document).data('hiddenSliderValue', 0);

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
	    */
	});
