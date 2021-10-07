'use strict';

/* ===================================================== Imports ==================================================== */
const express = require('express');
const router = express.Router();



/* ====================================================== Setup ===================================================== */

//	Get converter page
router.get('/', (req, res) => {

	//	Render converter page
	res.render('converter', { layout: 'converter' });

})



/* ===================================================== Exports ==================================================== */
module.exports = router;
