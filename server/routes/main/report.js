'use strict';

/* ===================================================== Imports ==================================================== */
const express = require('express');
const router = express.Router();



/* ====================================================== Setup ===================================================== */

//	Get report page
router.get('/', (req, res) => {

	//	Render converter page
	res.render('report', { layout: 'report' });

})



/* ===================================================== Exports ==================================================== */
module.exports = router;
