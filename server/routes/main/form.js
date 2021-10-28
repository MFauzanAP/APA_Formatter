'use strict';

/* ===================================================== Imports ==================================================== */
const express = require('express');
const router = express.Router();



/* ====================================================== Setup ===================================================== */

//	Get home page
router.get('/', (req, res) => {

	//	Render form page
	res.render('form', { 
		layout		: 'form', 
		page		: 'essay', 
		is_active 
	});

})



/* ===================================================== Helpers ==================================================== */

//	Function used to check if this link should be active
function is_active(page, index) {

	//	Declare array of pages
	var pages = [ 'submissions', 'essay', 'report' ];

	//	Return active if this link is active
	return pages.indexOf(page) == index ? 'active ' : '';

}



/* ===================================================== Exports ==================================================== */
module.exports = router;
