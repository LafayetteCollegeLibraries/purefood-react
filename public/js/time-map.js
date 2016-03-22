/**
 * ArcGIS for Server integration
 *
 */

var map;
require([
	 "esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer",
	 "esri/TimeExtent", "esri/dijit/TimeSlider", "esri/config",
	 "dojo/_base/array", "dojo/dom", "dojo/domReady!"
	 ], function(Map, ArcGISDynamicMapServiceLayer, Tiled,
		     TimeExtent, TimeSlider, esriConfig,
		     arrayUtils, dom
		     ) {

	    /*
	    esriConfig.defaults.map.panDuration;
	    esriConfig.defaults.map.panRate;
	    esriConfig.defaults.map.zoomDuration;
	    esriConfig.defaults.map.zoomRate;
	    */

	    var map = new Map("map", {
		    //basemap: "topo",
		    //center: [-101.15, 37.604],
		    zoom: 3
		});

	    // var opLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/OleoLeg_Test4/MapServer");
	    // var opLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Test5/MapServer");
	    // opLayer.setVisibleLayers([0,1,2,3]);
	    var landLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Paraf_Test1_land/MapServer");
	    var eventLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Paraf_Test1_itinerary/MapServer");
	    var cityLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Paraf_Test1_base/MapServer");

	    //apply a definition expression so only some features are shown 
	    /*
	    var layerDefinitions = [];
	    layerDefinitions[0] = "FIELD_KID=1000148164";
	    opLayer.setLayerDefinitions(layerDefinitions);
	    */

	    /**
	     * Modify the map
	     *
	     */
	    //map.addLayers([opLayer]);
	    //map.addLayers([tiledLayer,opLayer]);
	    map.addLayers([landLayer, cityLayer, eventLayer]);
	    //map.on("layers-add-result", initSlider);

	    /*
	    map.addLayer(opLayer);
	    map.on("layer-add-result", initSlider);
	    */

	    function initSlider() {
		var timeSlider = new TimeSlider({
			style: "width: 100%;"
		    }, dom.byId("timeSliderDiv"));
		map.setTimeSlider(timeSlider);
          
		var timeExtent = new TimeExtent();
		/*
		timeExtent.startTime = new Date("01/01/1880 UTC");
		timeExtent.endTime = new Date("01/01/1890 UTC");
		*/
		timeExtent.startTime = new Date("01/01/1845 UTC");
		timeExtent.endTime = new Date("01/01/1879 UTC");

		//timeSlider.createTimeStopsByTimeInterval(timeExtent, 1, "esriTimeUnitsYears");
		timeSlider.createTimeStopsByTimeInterval(timeExtent, 6, "esriTimeUnitsMonths");

		timeSlider.setThumbCount(2);
		timeSlider.setThumbIndexes([0,1]);
		timeSlider.setThumbMovingRate(2000);
		timeSlider.startup();
          
		//add labels for every other time stop
		var labels = arrayUtils.map(timeSlider.timeStops, function(timeStop, i) { 
			if ( i % 2 === 0 ) {
			    return timeStop.getUTCFullYear(); 
			} else {
			    return "";
			}
		    }); 
          
		timeSlider.setLabels(labels);
          
		timeSlider.on("time-extent-change", function(evt) {
			var startValString = evt.startTime.getUTCFullYear();
			var endValString = evt.endTime.getUTCFullYear();
			dom.byId("daterange").innerHTML = "<i>" + startValString + " and " + endValString  + "<\/i>";
		    });
	    }
	});
