var express = require('express')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , app = express()
    , port = process.env.PORT || 8001 // @todo Abstract
    , hostname = '139.147.4.143' // @todo Abstract
    , router = express.Router();

app.use(express.static(__dirname + '/views')); // set the static files location for the static html
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser());                      // pull information from html in POST
app.use(methodOverride());                  // simulate DELETE and PUT

router.get('/', function(req, res, next) {
  res.render('index');
});

app.use('/', router);

app.listen(port, hostname); // @todo Abstract
console.log('App running on port', port);
