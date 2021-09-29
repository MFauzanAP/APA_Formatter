'use strict';

//	Imports
const fs = require('fs');
const { Packer } = require('docx');
const { createReport } = require('docx-templates');
const actions = require('./actions');

/**	Submits an essay for formatting
 * 	@param {*} data Object containing information about the essay
 */
async function submit_essay (data) {

	//	Extract data from essay
	const { details, vocabulary, essay } = data;

	//	Process essay data into paragraphs to be inserted into the document
	var document = await actions.submit_essay(data);

	//	Output to file stream
	Packer.toBuffer(document).then((buffer) => {

		//	Write to file
		fs.writeFileSync('Formatted Essay.docx', buffer);

	});

	// const template = fs.readFileSync('Template.docx');

	// const buffer = await createReport({
	// 	template,
	// 	data
	// })

	// fs.writeFileSync('FormattedEssay.docx', buffer);

	//	Return success
	return {
		status		: 'success', 
		message		: 'Essay successfully formatted',
		body		: {}
	}

}

//	Export functions
module.exports = {
	submit_essay
}