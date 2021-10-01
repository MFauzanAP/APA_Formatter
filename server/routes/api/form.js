'use strict';

//	Imports
const express = require('express');
const router = express.Router();
const logic = require('../../controllers/form/logic');

//	Route called to submit data to be converted into a word document
router.post('/form/submit', async (req, res) => {

	//	Try catch
	try {

		//	Call submit essay function
		var result = await logic.submit_essay(req.body);

		//	Return result
		return res.json(result);

	} catch (error) {

		//	Log error
		console.log(error);

		//	Return error
		return res.json({
			status		: 'fail', 
			message		: `There was a problem formatting the essay. ${error}`,
			body		: {}
		});

	}

})

//	Route called to delete a previously made word document
router.post('/form/delete', async (req, res) => {

	//	Try catch
	try {

		//	Call delete file function
		var result = await logic.delete_essay(req.body);

		//	Return result
		return res.json(result);

	} catch (error) {

		//	Log error
		console.log(error);

		//	Return error
		return res.json({
			status		: 'fail', 
			message		: `There was a problem deleting the file. ${error}`,
			body		: {}
		});

	}

})

//	Export routes
module.exports = router