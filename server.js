
var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    nodemailer = require('nodemailer'),
    sendmailTransport = require('nodemailer-sendmail-transport'),
    util = require('util'),
    validator = require('express-validator'),
    sassMiddleware = require('node-sass-middleware'),
    path = require('path'),
    app = express(),
    host = process.env.HOST || 'localhost', // @todo Abstract
    port = process.env.PORT || 8001, // @todo Abstract
    router = express.Router();

app.use(express.static(__dirname + '/views')); // set the static files location for the static html
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser());                      // pull information from html in POST
app.use(validator());
app.use(methodOverride());                  // simulate DELETE and PUT
app.use(sassMiddleware({
	    root: path.join(__dirname),
	    src: 'scss',
	    dest: 'public',

	    force: true,
	    debug: true
}));

router.get('/', function(req, res, next) {
  res.render('index');
});

app.use('/', router);

app.post('/contact', function(req, res) {

	var responseBody = 'Thank you for your submission';
	var statusCode = 200;

	// Form validation
	// Ensure that all of the fields populated and validate the e-mail address
	req.checkBody('name', 'Your submission requires a name.  Please contact dss@lafayette.edu directly.').notEmpty();
	req.checkBody('email', 'Your submission requires a valid e-mail address.  Please contact dss@lafayette.edu directly.').notEmpty().isEmail();
	req.checkBody('subject', 'Your submission requires a subject.  Please contact dss@lafayette.edu directly.').notEmpty();
	req.checkBody('body', 'Your submission requires a message.  Please contact dss@lafayette.edu directly.').notEmpty();
	req.checkBody('spam', 'Your submission was filtered as spam.  Please contact dss@lafayette.edu directly.').len(0, 0);

	// Configure for the SMTP
	var mailOpts;
	var smtpTrans;

	smtpTrans = nodemailer.createTransport(sendmailTransport());

	mailOpts = {
	    from: req.body.name + ' <' + req.body.email + '>',
	    to: 'griffinj@lafayette.edu',
	    subject: 'Pure Food Project (' + req.body.subject + ')',
	    text: req.body.body
	};

	smtpTrans.sendMail(mailOpts, function(error, info) {

		// Handling for errors
		if(error) {
		    responseBody = "We're sorry, there appears to have been an error with your submission.  Please contact dss@lafayette.edu directly.";
		    statusCode = 400;
		}
	    });

	var errors = req.validationErrors();
	if(errors) {
	    responseBody = 'There have been validation errors: ' + util.inspect(errors);
	    statusCode = 400;
	}

	// Return the message for successes
	res.setHeader('Content-Type', 'application/json');
	res.status(statusCode).send(JSON.stringify( responseBody ));
    });

app.listen(port, host); // @todo Abstract
console.log('App running on port', port);
