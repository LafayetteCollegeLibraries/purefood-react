
module.exports = function(config) {
  config.set({

    basePath : '../',

    files : [
	     'public/vendor/init.js',

	     'public/bower_components/angular/angular.js',
	     'public/bower_components/angular-animate/angular-animate.js',
	     'public/bower_components/angular-route/angular-route.js',
	     'public/bower_components/angular-resource/angular-resource.js',
	     'public/bower_components/angular-mocks/angular-mocks.js',

	     'public/vendor/angular-sanitize.js',

	     'public/app/**/*.js',
	     'test/unit/**/*.js'
	     ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
