'use strict';

/* ===================================================== Imports ==================================================== */
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const hbs = require('express-handlebars');
const api = require('./server/routes/api/main');
const main = require('./server/routes/main/main');



/* ====================================================== Setup ===================================================== */

//	Setup environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

//	Setup express app
const app = express();

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

//	Setup port
const port = 3000;



/* ===================================================== Routing ==================================================== */

//	Connect api and main routes
app.use('/', api);
app.use('/', main);

//	All other urls should be an error
app.get('*', (req, res) => {

	//	Return error page
	return res.render('error/404', { layout: 'error/404' })

})



/* ================================================ Initialise Server =============================================== */

//	Open server to port
app.listen(port);

//	Print message
console.log('Server listening on port ' + port);
