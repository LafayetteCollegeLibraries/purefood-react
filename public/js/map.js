/**
 * ArcGIS for Server integration
 *
 */

var map;
require([
	 "esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer",
	 "esri/TimeExtent", "esri/dijit/TimeSlider", "esri/config", "esri/geometry/Point", "esri/geometry/Extent",
	 "esri/tasks/query", "esri/tasks/QueryTask",
	 "dojo/_base/array", "dojo/dom", "dojo/html", "dojo/domReady!"
	 ], function(Map, ArcGISDynamicMapServiceLayer, Tiled,
		     TimeExtent, TimeSlider, esriConfig, Point, Extent,
		     Query, QueryTask,
		     arrayUtils, dom, html
		     ) {

	    /*
	    esriConfig.defaults.map.panDuration;
	    esriConfig.defaults.map.panRate;
	    esriConfig.defaults.map.zoomDuration;
	    esriConfig.defaults.map.zoomRate;
	    */

	    var map = new Map("map1", {
		    //basemap: "topo",
		    //center: [-101.15, 37.604],
		    zoom: 1,
		    logo: false
		});

	    $('#map').data('esri/map', map);

	    // var opLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/OleoLeg_Test4/MapServer");
	    // var opLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Test5/MapServer");
	    // opLayer.setVisibleLayers([0,1,2,3]);
	    var landLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Paraf_Test1_land/MapServer");
	    var eventLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Paraf_Test1_itinerary/MapServer");
	    var cityLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Paraf_Test1_base/MapServer");
	    var bostonLayer = new ArcGISDynamicMapServiceLayer("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Paraf_Test1_Boston/MapServer");

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
	    map.addLayers([landLayer,
			   cityLayer,
			   bostonLayer,
			   eventLayer]);
	    //map.on("layers-add-result", initSlider);

	    /*
	    map.addLayer(opLayer);
	    map.on("layer-add-result", initSlider);
	    */

	    var queryTask = new QueryTask("//geo.stage.lafayette.edu/arcgis/rest/services/clarkjh/Paraf_Test1_itinerary/MapServer");
            var query = new Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            query.outSpatialReference = { "wkid": 4326 };
	    query.where = "ORDER = *";

            //Can listen for complete event to process results
            //or can use the callback option in the queryTask.execute method.
            queryTask.on("complete", function (event) {
		    //map.graphics.clear();
		    
		    /*
		    var features = event.featureSet.features;
		    // QueryTask returns a featureSet.
		    // Loop through features in the featureSet and add them to the map.
		    var featureCount = features.length;
		    for (var i = 0; i < featureCount; i++) {

			//Get the current feature from the featureSet.
			var graphic = features[i]; //Feature is a graphic

			console.log(graphic);
		    }
		    */
		});

	    var mulhouse = {
		xmax: 22.10275579019296,
		xmin: -7.4377817901929575,
		ymax: 52.494876816720264,
		ymin: 43.008703183279735
	    };

	    var glasgow = {
		xmax: 10.511837381832803,
		xmin: -19.028700198553096,
		ymax: 60.60259084405147,
		ymin: 51.11641721061094
	    };

	    var paris = {
		xmax: 17.10769248633442,
		xmin: -12.432845094051478,
		ymax: 53.60653778938908,
		ymin: 44.12036415594855
	    };

	    var newYork = {
		xmax: -73.97791881876913,
		xmin: -74.03561518123084,
		ymax: 40.71905584143891,
		ymin: 40.70052815856109,
		"spatialReference": {"wkid":4326}
	    };

	    var providence = {
		xmax: -67.72130356973479,
		xmin: -75.10643796483127,
		ymax: 43.00870318327974,
		ymin: 40.6371597749196
	    };

	    var boston = {
		xmax: -71.0290015797532,
		xmin: -71.0866979422149,
		ymax: 42.3683690933198,
		ymin: 42.34984141044199,
		"spatialReference": {"wkid":4326}
	    };

	    var sanFrancisco = {
		xmax: -118.72642780245174,
		xmin: -126.11156219754825,
		ymax: 38.98579070418007,
		ymin: 36.61424729581993
	    }

	    var santiago = {
		xmax: -41.107503419613934,
		xmin: -100.18857858038608,
		ymax: -23.984225366559414,
		ymin: -42.95657263344059
	    };

	    var valdivia = {
		xmax: -43.67601541961393,
		xmin: -102.75709058038608,
		ymax: -30.305481366559412,
		ymin: -49.277828633440585
	    }

	    var virginiaCity = {
		xmax: -90.1093374196139,
		xmin: -149.1904125803861,
		ymax: 48.795571633440595,
		ymin: 29.82322436655941
	    };

	    var steps = [
			 //[7.332487,47.751790], // Mulhouse
			 mulhouse,
			 //[-4.251938,55.859129], // Glasgow
			 glasgow,
			 //[2.348270,48.856358], // Paris
			 paris,
			 //[-74.006767,40.709792], // New York City
			 newYork,
			 //[-71.411161,41.824421], // Providence
			 providence,
			 //[-71.057882,42.359432], // Boston
			 boston,
			 //[-122.418995,37.800019], // San Francisco
			 sanFrancisco,
			 //[-70.648041,-33.470399], // Santiago
			 santiago,
			 //[-73.216553,-39.791655], // Valdivia
			 valdivia,
			 //[-119.649875,39.309398] // Virginia City
			 virginiaCity
			 ];

	    var attributes = [
			      {name: 'Mulhouse', zoom: null, template: '' },
			      {name: 'Glasgow', zoom: null, template: '' },
			      {name: 'Paris', zoom: null, template: '' },
			      {name: 'New York City', zoom: null, template: '' },
			      {name: 'Providence', zoom: null, template: '' },
			      {name: 'Boston', zoom: null, template: '' },
			      {name: 'San Francisco', zoom: null, template: '' },
			      {name: 'Santiago', zoom: null, template: '' },
			      {name: 'Valdivia', zoom: null, template: '' },
			      {name: 'Virginia City', zoom: null, template: '' }
			      ];

	    var initialZoom = 0.1;

	    var currentStep = 0;
	    var coords = steps[currentStep];
	    var feature = attributes[currentStep];

	    var step = function(event) {
		coords = steps[currentStep];
		feature = attributes[currentStep];
		dojo.byId('location').textContent = feature.name;

		var coords = steps[currentStep];

		if(coords.constructor == Object) {
		    map.setExtent( new Extent(coords) );
		} else {
		    if( typeof(feature.zoom) === 'number' ) {
			map.centerAndZoom(new Point( coords ),  feature.zoom);
		    } else {
			map.centerAt(coords);
		    }
		}
	    };

	    var nextStep = function(event) {
		if(currentStep == steps.length - 1) {
		    currentStep = 0;
		} else {
		    currentStep++;
		}

		return step();
	    };

	    var prevStep = function() {
		if(currentStep == 0) {
		    currentStep = steps.length - 1 ;
		} else {
		    currentStep = currentStep - 1;
		}

		return step();
	    };

	    var delay = 5 * 1000;
	    var play = function() {
		var mapTimeoutID = window.setTimeout(function() {
			play();
		    }, delay);

		$(window).data('mapTimeoutID', mapTimeoutID);
		nextStep();
	    };
	    var pause = function() {
		var mapTimeoutID = $(window).data('mapTimeoutID');

		window.clearTimeout(mapTimeoutID);
		$(window).data('mapTimeoutID', null);
	    };

	    var updateState = function(event) {
		var mapTimeoutID = $(window).data('mapTimeoutID');

		if(mapTimeoutID == undefined) {
		    play();
		    $(event.target).removeClass('glyphicon-play').addClass('glyphicon-pause');
		} else {
		    pause();
		    $(event.target).removeClass('glyphicon-pause').addClass('glyphicon-play');
		}
	    };

	    map.on("layers-add-result", function() {
		    if(coords.constructor == Object) {
			map.setExtent( new Extent(coords) ).then(function() {
				dojo.byId('location').textContent = feature.name;
				dojo.query('#next-step').onclick(nextStep);
				dojo.query('#prev-step').onclick(prevStep);
				dojo.query('#play-pause').onclick(updateState);
			    });
		    } else {
			map.centerAndZoom(new Point( coords ), initialZoom).then(function() {
				dojo.byId('location').textContent = feature.name;
				dojo.query('#next-step').onclick(nextStep);
				dojo.query('#prev-step').onclick(prevStep);
				dojo.query('#play-pause').onclick(updateState);
			    });
		    }
		});

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
