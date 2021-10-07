'use strict';

/* ===================================================== Imports ==================================================== */
const express = require('express');
const router = express.Router();



/* ====================================================== Setup ===================================================== */

//	Get checklist page
router.get('/', (req, res) => {

	//	Render checklist page
	res.render('checklist', { layout: 'checklist' });

})



/* ===================================================== Exports ==================================================== */
module.exports = router;
