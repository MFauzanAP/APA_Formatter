'use strict';

//	Imports
const _ = require('lodash');
const {
	Header,
	PageNumber,
	Paragraph, 
	TextRun, 
	AlignmentType,
	UnderlineType
	
} = require('docx');
const converters = require('../utilities/converters');

//	Declare array to hold the highlighted words found in the essay
var included_highlights = [];

/**	Sets included highlights, used externally
 */
function set_included_highlights (value) {

	//	Set included highlights
	included_highlights = value;

}

/**	Gets included highlights, used externally
 */
function get_included_highlights () {

	//	Return included highlights
	return included_highlights;

}

/** 	Sets up the header by adding page numbers
 * 	@param {object} data The object containing data to be processed
 */
function setup_header () {

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
	if (data.details.student_name) cover_page.children.push(write_line(data.details.student_name));

	//	Add student id
	if (data.details.student_id) cover_page.children.push(write_line(data.details.student_id));

	//	Add university name
	if (data.details.institution) cover_page.children.push(write_line(data.details.institution || 'Qatar University'));

	//	Add course name and number
	if (data.details.course_number) cover_page.children.push(write_line(data.details.course_number));

	//	Add lecturer name
	if (data.details.lecturer_name) cover_page.children.push(write_line(data.details.lecturer_name));

	//	Reformat date
	if (data.details.date) data.details.date = converters.convert_picker_to_date(data.details.date);

	//	Add date
	if (data.details.date) cover_page.children.push(write_line(data.details.date));

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
	const { vocabulary, essay } = data.essay;

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
			essay_text.children = write_essay_line(data, '	' + paragraph, {break: 0}, vocabulary);

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

/**	Writes a line to the paragraph
 * 	@param {string} text The text to write in the line
 * 	@param {object} paragraph The paragraph to write to
 * 	@param {array} highlights An array of the words to make bold
 */
function write_essay_line (data, text, options = {}, highlights = []) {

	//	Extract data from essay
	const { essay, settings } = data;

	//	Declare list of text
	var text_runs = [];

	//	Declare list of indexes to split the text by
	var indexes = [];

	//	Loop through each highlighted word and check if it exists in the essay
	if (included_highlights.length < settings.vocab_word_limit) highlights.forEach(highlight => {

		//	Create regex to test for word
		var regex = `\\b${highlight.toLowerCase().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")}\\b`;

		//	Check if text contains this word
		if (new RegExp(regex, "i").test(text)) {

			//	If this word is already included or if there can be no more highlights, skip this word
			if (!included_highlights.includes(highlight) && included_highlights.length < settings.vocab_word_limit) {

				//	Add this word to the list of included highlights
				included_highlights.push(highlight);

				//	Get index of highlighted word
				var index = text.toLowerCase().search(regex);

				//	Add index to list of indexes to split the text by
				indexes.push({index, highlight});

			}

		}

	});

	//	Declare variable to store the last index of the highlighted word
	var last_index = 0;

	//	Order index from first to last
	indexes.sort((a, b) => a.index - b.index );

	//	Loop through each index
	indexes.forEach(elem => {

		//	Declare highlight settings
		var highlight = {
			text		: text.substring(elem.index, elem.index + elem.highlight.length),
			bold		: settings.highlight_type == 'bold',
			italics		: settings.highlight_type == 'italic',
			strike		: settings.highlight_type == 'strikethrough',
			allCaps		: settings.highlight_type == 'capitalise',
			highlight	: settings.highlight_type == 'yellow highlight' ? 'yellow' : '',
			underline	: settings.highlight_type == 'underline' ? { type: UnderlineType.SINGLE, color: settings.font_color } : null,
		}

		//	Create new text run object for this word as well as for the text before this word
		text_runs.push(new TextRun({text: text.substring(last_index, elem.index), break: text_runs.length ? 0 : 1, ...options}));
		text_runs.push(new TextRun(highlight));

		//	Set last index
		last_index = elem.index + elem.highlight.length;

	});

	//	Add the rest of the text to the array
	text_runs.push(new TextRun({text: text.substring(last_index, text.length), ...options }));

	//	Return formatted text
	return text_runs;

}

//	Export functions
module.exports = {
	set_included_highlights,
	get_included_highlights,
	setup_header,
	create_cover_page,
	create_title,
	create_essay,
	create_word_count
}