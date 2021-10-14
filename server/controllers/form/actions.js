'use strict';

//	Imports
const { Document, VerticalAlign } = require('docx');
const fs = require('fs');
const word = require('./word');

/**	Processes essay data into paragraphs to be inserted into the document
 *	@param {object} data The object containing data to be processed
 */
async function submit_essay (data) {

	//	Extract essay n settings
	const { essay, settings } = data;

	//	Extract details from essay
	const { details } = essay;

	//	Reset included highlights
	word.set_included_highlights([]);

	//	Create headers
	const header = settings.page_numbers === 'true' ? word.setup_header() : '';

	//	Create cover page
	const cover_page = settings.cover_page === 'true' ? word.create_cover_page(essay) : '';

	//	Create title
	const title = settings.essay_title === 'true' ? word.create_title(essay) : '';

	//	Create essay
	const essay_text = word.create_essay(data);

	//	Create word count
	const word_count = settings.word_count === 'true' ? word.create_word_count(essay) : '';

	//	Add title and word count to children array
	var children = [];
	if (title) children.push(title);
	if (word_count) children.push(word_count);

	//	Concatenate essay text into children
	children.splice(title ? 1 : 0, 0, ...essay_text);

	//	Setup document
	var document = {
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
					color			: settings.font_color || '000000',
					font			: settings.font_family || 'Times New Roman',
					size			: settings.font_size * 2 || 24
				},
				paragraph		: {
					spacing			: {
						before			: Math.min(2, Math.max(0, settings.paragraph_spacing)) * 120 || 0,
						after			: Math.min(2, Math.max(0, settings.paragraph_spacing)) * 120 || 0,
						line			: Math.min(2, Math.max(0, settings.line_spacing)) * 240 || 480
					}
				}
			}]
		},
		sections		: [ ],
	}

	//	Add cover page to document
	if (cover_page) document.sections.push({
		properties		: {
			verticalAlign		: VerticalAlign.CENTER,
			page			: {
				margin			: {
					top			: Math.min(3, Math.max(0, settings.margin_spacing)) * 1440 || 1440, 
					bottom			: Math.min(3, Math.max(0, settings.margin_spacing)) * 1440 || 1440, 
					left			: Math.min(3, Math.max(0, settings.margin_spacing)) * 1440 || 1440, 
					right			: Math.min(3, Math.max(0, settings.margin_spacing)) * 1440 || 1440, 
				}
			}
		},
		headers			: {
			default			: header
		},
		children		: [ cover_page ]
	});

	//	Add the rest of the essay to the document
	document.sections.push({
		properties		: {
			page			: {
				margin			: {
					top			: Math.min(3, Math.max(0, settings.margin_spacing)) * 1440 || 1440, 
					bottom			: Math.min(3, Math.max(0, settings.margin_spacing)) * 1440 || 1440, 
					left			: Math.min(3, Math.max(0, settings.margin_spacing)) * 1440 || 1440, 
					right			: Math.min(3, Math.max(0, settings.margin_spacing)) * 1440 || 1440, 
				}
			}
		},
		headers			: {
			default			: header
		},
		children		: children
	});

	//	Return document
	return { document: new Document(document), words: word.get_included_highlights() };

}

/**	Deletes an essay file from the server
 *	@param {object} data The object containing path to the file
 */
async function delete_essay (data) {

	//	If the file doesnt exist then return an error
	if (!fs.existsSync(`./public/word/${data.path}.docx`)) return {
		status		: 'fail', 
		message		: 'File not found',
		body		: {}
	}

	//	Delete the file at the given path
	fs.unlinkSync(`./public/word/${data.path}.docx`);

	//	Return response
	return {
		status		: 'success', 
		message		: 'Essay successfully deleted',
		body		: {}
	}

}

//	Export functions
module.exports = {
	submit_essay,
	delete_essay
}