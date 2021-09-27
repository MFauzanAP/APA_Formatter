'use strict';

/* ===================================================== Imports ==================================================== */
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const rateLimit = require('express-rate-limit');
const http = require('http');
const api = require('./server/routes/api/main');
const main = require('./server/routes/main/main');



/* ====================================================== Setup ===================================================== */

//	Setup environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

//	Setup express app
const app = express();

//	Setup server
http.createServer(app);

//	Setup safe headers
app.use(helmet());

//	Setup morgan to log requests to the console
app.use(morgan('dev'));

//	Setup body parser to retrieve data from forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//	Setup view engine
app.engine('hbs', hbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');

//	Setup static routes
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'bower_components')));

//	Setup port
const port = 4000;



/* ================================================== Rate Limiting ================================================= */

//	Declare limit object
var limit = new rateLimit({
	windowMS	: 10 * 60 * 1000, 
	max		: 100,
	skip		: (req, res) => {
		return req.url.substring(0, 8) == '/static/';
	}
});

//	Apply rate limiting
app.use(limit);



/* ===================================================== Routing ==================================================== */

//	Connect api and main routes
app.use('/', api);
app.use('/', main);

//	All other urls should be an error
app.get('*', (req, res) => {

	//	Return error page
	return res.render('404', { layout: '404' })

})



/* ================================================ Initialise Server =============================================== */

//	Open server to port
app.listen(port);

//	Print message
console.log('Server listening on port ' + port);