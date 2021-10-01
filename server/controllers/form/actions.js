'use strict';

//	Imports
const { Document } = require('docx');
const fs = require('fs');
const word = require('./word');

/**	Processes essay data into paragraphs to be inserted into the document
 *	@param {object} data The object containing data to be processed
 */
async function submit_essay (data) {

	//	Extract data from essay
	const { details } = data;

	//	Reset included highlights
	word.set_included_highlights([]);

	//	Create headers
	const header = word.setup_header();

	//	Create cover page
	const cover_page = word.create_cover_page(data);

	//	Create title
	const title = word.create_title(data);

	//	Create essay
	const essay = word.create_essay(data);

	//	Create word count
	const word_count = word.create_word_count(data);

	//	Concatenate into one array
	var children = [ cover_page, title, word_count ];
	children.splice(2, 0, ...essay);

	//	Setup document
	var document = new Document({
		creator			: details.student_name,
		subject			: details.title,
		title			: details.title,
		styles			: {
			paragraphStyles		: [{
				id			: 'Default',
				name			: 'Default',
				basedOn			: 'Normal',
				next			: 'Normal',
				quickFormat		: true,
				run			: {
					color			: '000000',
					font			: 'Times New Roman',
					size			: 24
				},
				paragraph		: {
					spacing			: {
						before			: 0,
						after			: 0,
						line			: 480
					}
				}
			}]
		},
		sections		: [ 
			{
				properties		: {},
				headers			: {
					default			: header
				},
				children		: children
			}
		],
	})

	//	Return document
	return { document, words: word.get_included_highlights() };

}

 */


	}


	}

}

//	Export functions
module.exports = {
	submit_essay
}