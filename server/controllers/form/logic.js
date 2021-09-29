'use strict';

//	Imports
const fs = require('fs');
const { Packer } = require('docx');
const actions = require('./actions');

/**	Submits an essay for formatting
 * 	@param {*} data Object containing information about the essay
 */
async function submit_essay (data) {

	//	Process essay data into paragraphs to be inserted into the document
	var document = await actions.submit_essay(data);

	//	Generate random file name
	var file_name = new Date().getTime().toString();

	//	Output to file stream
	Packer.toBuffer(document).then((buffer) => {

		//	Write to file
		fs.writeFileSync(`./public/word/${file_name}.docx`, buffer);

	});

	//	Return success
	return {
		status		: 'success', 
		message		: 'Essay successfully formatted',
		body		: file_name
	}

}

//	Export functions
module.exports = {
	submit_essay
}