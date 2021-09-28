'use strict';

//	Imports
const express = require('express');
const router = express.Router();
const logic = require('../../controllers/form/logic');

//	Route called to submit data to be converted into a word document
router.post('/form/submit', async (req, res) => {

	//	Try catch
	try {

		//	Call submit essay function and return the reult
		return res.json(logic.submit_essay(req.body));

	} catch (error) {

		//	Output error
		console.log(error);

		//	Return error
		return res.json({
			status		: 'fail', 
			message		: `There was a problem formatting the essay. ${error}`,
			body		: {}
		});

	}

})

//	Export routes
module.exports = router