/**
 * End-to-end tests for the App.
 * @author griffinj@lafayette.edu
 *
 */


describe('PureFood', function() {

	/**
	 * Test the StoryMapController
	 *
	 */
	describe('StoryMapController', function() {

		beforeEach(function() {
			browser.get('/');
		    });

		it('steps forwards', function() {
			var nextStep = element(by.id('next-step'));
			nextStep.click().then(function() {

			var location = element(by.id('location'));
			expect(location.getText()).toBe('Glasgow');
			    });
		    });

		it('steps backwards', function() {
			var prevStep = element(by.id('prev-step'));
			prevStep.click().then(function() {

			var location = element(by.id('location'));
			expect(location.getText()).toBe('Virginia City');
			    });
		    });
	    });
    });
