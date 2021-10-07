'use strict';

/* ===================================================== Imports ==================================================== */
const express = require('express');
const router = express.Router();



/* ====================================================== Setup ===================================================== */

//	Get dashboard page
router.get('/', (req, res) => {

	//	Render dashboard page
	res.render('dashboard', { layout: 'dashboard' });

})



/* ===================================================== Exports ==================================================== */
module.exports = router;
