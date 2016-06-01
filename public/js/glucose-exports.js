/**
 * Integration for the OpenSeadragon Image Viewer
 * @todo Refactor into AngularJS Controllers
 *
 */
var tileSourceSettings = {
    'tileSize' : 256,
    'tileOverlap' : 0
};

var tileSource = new OpenSeadragon.DjatokaTileSource('/adore-djatoka/resolver', 'http://purefood.stage.lafayette.edu/img/columbiana.jpf', tileSourceSettings);

var config = {
    'id': 'osd-viewer',
    'prefixUrl': "/vendor/openseadragon-bin-2.1.0/images/",
    'debugMode' : false,
    'djatokaServerBaseURL' : 'http://purefood.stage.lafayette.edu/adore-djatoka/resolver',
    'animationTime' : 1.5,
    'blendTime' : 0.1,
    'alwaysBlend' : false,
    'autoHideControls' : true,
    'immediateRender' : false,
    'wrapHorizontal' : false,
    'wrapVertical' : false,
    'wrapOverlays' : false,
    'panHorizontal' : true,
    'panVertical' : true,
    'minZoomImageRatio' : 0.8,
    'maxZoomPixelRatio' : 2,
    'visibilityRatio' : 0.5,
    'springStiffness' : 5.0,
    'imageLoaderLimit' : 5,
    'clickTimeThreshold' : 300,
    'clickDistThreshold' : 5,
    'zoomPerClick' : 2.0,
    'zoomPerScroll' : 1.2,
    'zoomPerSecond' : 2.0,
    'showNavigator' : true,
    'defaultZoomLevel' : 1.0,
    'tileSources': new Array(tileSource)
};

var viewer = OpenSeadragon(config);

var update_clip = function(viewer) {
    var fitWithinBoundingBox = function(d, max) {
	if (d.width/d.height > max.x/max.y) {
	    return new OpenSeadragon.Point(max.x, parseInt(d.height * max.x/d.width));
	} else {
	    return new OpenSeadragon.Point(parseInt(d.width * max.y/d.height),max.y);
	}
    }

    var getDisplayRegion = function(viewer, source) {
	// Determine portion of scaled image that is being displayed.
	var box = new OpenSeadragon.Rect(0, 0, source.x, source.y);
	var container = viewer.viewport.getContainerSize();
	var bounds = viewer.viewport.getBounds();
	// If image is offset to the left.
	if (bounds.x > 0){
	    box.x = box.x - viewer.viewport.pixelFromPoint(new OpenSeadragon.Point(0,0)).x;
	}
	// If full image doesn't fit.
	if (box.x + source.x > container.x) {
	    box.width = container.x - viewer.viewport.pixelFromPoint(new OpenSeadragon.Point(0,0)).x;
	    if (box.width > container.x) {
		box.width = container.x;
	    }
	}
	// If image is offset up.
	if (bounds.y > 0) {
	    box.y = box.y - viewer.viewport.pixelFromPoint(new OpenSeadragon.Point(0,0)).y;
	}
	// If full image doesn't fit.
	if (box.y + source.y > container.y) {
	    box.height = container.y - viewer.viewport.pixelFromPoint(new OpenSeadragon.Point(0,0)).y;
	    if (box.height > container.y) {
		box.height = container.y;
	    }
	}
	return box;
    }
    var source = viewer.source;
    
    var zoom = viewer.viewport.getZoom();
    var size = new OpenSeadragon.Rect(0, 0, source.dimensions.x, source.dimensions.y);
    var container = viewer.viewport.getContainerSize();
    var fit_source = fitWithinBoundingBox(size, container);
    var total_zoom = fit_source.x/source.dimensions.x;
    var container_zoom = fit_source.x/container.x;
    var level = (zoom * total_zoom) / container_zoom;
    var box = getDisplayRegion(viewer, new OpenSeadragon.Point(parseInt(source.dimensions.x*level), parseInt(source.dimensions.y*level)));
    var scaled_box = new OpenSeadragon.Rect(parseInt(box.x/level), parseInt(box.y/level), parseInt(box.width/level), parseInt(box.height/level));
    var params = {
	'url_ver': 'Z39.88-2004',
	'rft_id': source.imageID,
	'svc_id': 'info:lanl-repo/svc/getRegion',
	'svc_val_fmt': 'info:ofi/fmt:kev:mtx:jpeg2000',
	'svc.format': 'image/jpeg',
	'svc.region': scaled_box.y + ',' + scaled_box.x + ',' + (scaled_box.getBottomRight().y - scaled_box.y) + ',' + (scaled_box.getBottomRight().x - scaled_box.x),
    };
    var dimensions = (zoom <= 1) ? source.dimensions.x + ',' + source.dimensions.y : container.x + ',' + container.y;
};

//viewer.addHandler("open", update_clip);
//viewer.addHandler("animationfinish", update_clip);
var TIME_STEPS_MAX = 3;
var timeControl = $("#input-time-slider").slider({ id: 'time-slider',
						   value: 0,
						   max: TIME_STEPS_MAX,
						   tooltip: 'hide' }).on('slide', function(e) {
							   /*
							   var slider = $(document).data('timeSlider');
							   slider.setThumbIndexes( [e.value] );
							   $(document).data('hiddenSliderValue', e.value);
							   */
						       });
