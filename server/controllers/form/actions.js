'use strict';

//	Imports
const _ = require('lodash');
const { 
	Document,
	Header,
	PageNumber,
	Paragraph, 
	TextRun, 
	AlignmentType, 
	PageBreak
} = require('docx');

/**	Processes essay data into paragraphs to be inserted into the document
 *	@param {object} data The object containing data to be processed
 */
async function submit_essay (data) {

	//	Extract data from essay
	const { details } = data;

	//	Create headers
	const header = setup_header();

	//	Create cover page
	const cover_page = create_cover_page(data);

	//	Create title
	const title = create_title(data);

	//	Create essay
	const essay = create_essay(data);

	//	Create word count
	const word_count = create_word_count(data);

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
					},
					indent			: {
						left			: 720
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
	return document;

}

/** 	Sets up the header by adding page numbers
 * 	@param {object} data The object containing data to be processed
 */
function setup_header (data) {

	//	Create a header text
	var header = new Paragraph({
		alignment		: AlignmentType.RIGHT,
		style			: 'Default',
		children		: [
			new TextRun({children: [PageNumber.CURRENT]})
		],
	});

	//	Return header
	return new Header({
		children		: [header]
	});

}

/**	Creates the cover page
 * 	@param {object} data The object containing data to be processed
 */
function create_cover_page (data) {

	//	Create cover page paragraph
	var cover_page = {
		alignment		: AlignmentType.CENTER,
		style			: 'Default',
		children		: [],
	}

	//	Add title
	cover_page.children.push(write_line(data.details.title, {bold: true, break: 0}));

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

/**	Creates the title
 * 	@param {object} data The object containing data to be processed
 */
 function create_title (data) {

	//	Create title paragraph
	var title = {
		alignment		: AlignmentType.CENTER,
		style			: 'Default',
		children		: [],
	}

	//	Add title
	title.children.push(write_line(data.details.title, {bold: true, break: 0}));

	//	Return title
	return new Paragraph(title);

}

/**	Creates the essay
 * 	@param {object} data The object containing data to be processed
 */
 function create_essay (data) {

	//	Extract data from essay
	const { essay } = data;

	//	Declare array of paragraphs
	var paragraphs = [];

	//	Split essay into paragraphs
	var split = essay.split('\n');

	//	Loop through each paragraph and add it to the essay
	split.forEach(paragraph => {

		//	If not empty
		if (paragraph) {

			//	Create starting essay text
			var essay_text = {
				alignment		: AlignmentType.LEFT,
				style			: 'Default',
				children		: [],
			};

			//	Add paragraph
			essay_text.children.push(write_line('	' + paragraph, {break: 0}));

			//	Add this to list of paragraphs
			paragraphs.push(new Paragraph(essay_text));

		}
		
	});

	//	Return essay
	return paragraphs;

}

/**	Creates the word count indicator
 * 	@param {object} data The object containing data to be processed
 */
 function create_word_count (data) {

	//	Extract data from essay
	const { essay } = data;

	//	Get a match of all non whitespace words
	var matches = essay.match(/\S+/g);
	
	//	Calculate number of words
	var num_words = matches ? matches.length : 0;

	//	Create word count settings
	var word_count = {
		alignment		: AlignmentType.RIGHT,
		style			: 'Default',
		children		: [],
	}

	//	Add word count
	word_count.children.push(write_line(`Word Count-${num_words}`, {break: 0}));

	//	Return word count
	return new Paragraph(word_count);

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