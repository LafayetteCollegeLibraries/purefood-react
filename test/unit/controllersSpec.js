/**
 * The unit tests for the Controllers
 * @author griffinj@lafayette.edu
 *
 */


describe('storyEvents', function() {
	var scope, ctrl, $httpBackend;

	// Load our app module definition before each test.
	beforeEach(module('pureFood'));

	beforeEach(inject(function(_$httpBackend_) {
		    $httpBackend = _$httpBackend_;
		    $httpBackend.expectGET('data/events.json').
			respond([
				 {
				     "name":"Mulhouse",
				     "extent": {
					 "xmax":22.10275579019296,
					 "xmin":-7.4377817901929575,
					 "ymax":52.494876816720264,
					 "ymin":43.008703183279735,
					 "spatialReference": { "wkid": 4326 }
				     },
				     "template": "<div id=\"location-image\" class=\"container-fluid\">testing</div>"
				 },
				 {
				     "name":"Glasgow",
				     "extent":{
					 "xmax":10.511837381832803,
					     "xmin":-19.028700198553096,
				     "ymax":60.60259084405147,
				     "ymin":51.11641721061094,
				     "spatialReference":{ "wkid":4326 }
				     },
				     "template":"<div id=\"location-image\" class=\"container-fluid\">testing2</div>"
				 },
				 ]);
		}));

	it('updates events on the Story Map', inject(function(storyEvents) {

		    expect(storyEvents).toBeDefined();

		    var testEvents = function(promise) {

			// @todo Refactor
			expect(promise.data).toBeDefined();
			expect(promise.data.length).toBe(2);

			expect(promise.data[0].name).toBe('Mulhouse');
			expect(promise.data[1].name).toBe('Glasgow');
		    };

		    var testFailure = function(error) {
			expect(error).toBeUndefined();
		    };

		    storyEvents.then(testEvents)
			.catch(testFailure);

		    $httpBackend.flush();
		}));
    });

/**
 * Test the StoryEventController
 *
 */
describe('StoryEventController', function() {

	beforeEach(module('pureFood'));

	it('updates events on the Story Map', inject(function($rootScope, $controller) {

		    var scope = {};
		    var ctrl = $controller('StoryEventController', { $scope: scope });

		    expect(scope.updateEvent).toBeDefined();
		    scope.updateEvent('test event name', 'test event content');
		    expect(scope.name).toBe('test event name');
		    expect(scope.content).toBe('test event content');
		}));
});

/**
 * Test the StoryMapController
 *
 */
describe('StoryMapController', function() {

	beforeEach(module('pureFood'));

	/*
	it('updates events on the Story Map', inject(function($rootScope, $controller) {

		    var scope = {};
		    var ctrl = $controller('StoryEventController', { $scope: scope });

		    expect(scope.updateEvent).toBeDefined();
		    scope.updateEvent('test event name', 'test event content');
		    expect(scope.name).toBe('test event name');
		    expect(scope.content).toBe('test event content');
		}));
	*/
});

/**
 * Test the StoryLayerController
 *
 */
describe('StoryLayerController', function() {

	beforeEach(module('pureFood'));
});
