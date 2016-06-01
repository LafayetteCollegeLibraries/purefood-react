exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'phantomjs'
  },

  //baseUrl: 'http://139.147.4.143:8001/',
  baseUrl: 'http://localhost:8001/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
