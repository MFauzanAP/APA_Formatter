'use strict';

//	Imports
const { 
	Document,
	Paragraph, 
	TextRun, 
	AlignmentType, 
	PageBreak
} = require('docx');

/**	Processes essay data into paragraphs to be inserted into the document
 *	@param {object} data The object containing data to be processed
 *	@param {object} document The document to insert the paragraphs into
 */
async function submit_essay (data) {

	//	Extract data from essay
	const { details, vocabulary, essay } = data;

	//	Create cover page
	const cover_page = create_cover_page(data);

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
					},
					indent			: {
						left			: 720
					}
				}
			}]
		},
		sections		: [ 
			{
				properties		: {

				},
				children		: [ cover_page ]
			}
		],
	})

	//	Return document
	return document;

}

/** 	Sets up the header by adding page numbers
 * 	@param {object} data The object containing data to be processed
 *	@param {object} document The document to insert the paragraphs into
 */
function setup_header (data, document) {

	//	Add a header to the document
	var header = document.getHeader().createP();

	//	Add pages
	header.addText('1');

	//	Return header
	return header;

}

/**	Creates the cover page
 * 	@param {object} data The object containing data to be processed
 *	@param {object} document The document to insert the paragraphs into
 */
function create_cover_page (data) {

	//	Create cover page paragraph
	var cover_page = {
		alignment		: AlignmentType.CENTER,
		style			: 'Default',
		children		: [],
	}

	//	Add title
	cover_page.children.push(write_line(data.details.title, {bold: true}));

	//	Add line break
	cover_page.children.push(new TextRun({break: 1}));

	//	Add student name
	cover_page.children.push(write_line(data.details.student_name));

	//	Add student id
	cover_page.children.push(write_line(data.details.student_id));

	//	Add university name
	cover_page.children.push(write_line('Qatar University'));

	//	Add course name and number
	cover_page.children.push(write_line(data.details.course_number));

	//	Add lecturer name
	cover_page.children.push(write_line(data.details.lecturer_name));

	//	Add date
	cover_page.children.push(write_line(data.details.date));

	//	Add page break
	cover_page.children.push(new PageBreak());

	//	Return cover page
	return new Paragraph(cover_page);

}

/**	Writes a line to the paragraph
 * 	@param {string} text The text to write in the line
 * 	@param {object} paragraph The paragraph to write to
 */
 function write_line (text, options = {}) {

	//	Declare settings
	var settings = {
		text		: text, 
		break		: 1
	};

	//	Loop through options and add each option to settings
	Object.keys(options).forEach(option => {

		//	Add to settings
		settings[option] = options[option];
		
	});

	//	Return new line
	return new TextRun(settings);

}

//	Export functions
module.exports = {
	submit_essay
}