'use strict';

//	Imports
const fs = require('fs');
const { Packer } = require('docx');
const actions = require('./actions');
const processor = require('./processor');

/**	Submits an essay for formatting
 * 	@param {*} data Object containing information about the essay
 */
async function submit_essay (data) {

	//	Sanitize data
	data = processor.submit_essay_processor(data);

	//	Process essay data into paragraphs to be inserted into the document
	const { document, words } = await actions.submit_essay(data);

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
		body		: { file_name, words }
	}

}

/**	Deletes a formatted essay from the database
 * 	@param {*} data Object containing information about the essay file
 */
 async function delete_essay (data) {

	//	Deletes the essay file from the database and return the response
	return await actions.delete_essay(data);

}

//	Export functions
module.exports = {
	submit_essay,
	delete_essay
}