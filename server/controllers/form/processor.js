'use strict';

//	Imports
const sanitizeHtml = require('sanitize-html');

/**	Processes data for an essay and sanitizes all data
 * 	@param {object} data Object containing essay data
 */
function submit_essay_processor (data) {

	//	Extract data from parameter
	var { essay, settings } = data;

	//	Sanitize essay details
	essay.details.title = sanitizeHtml(essay.details.title);
	essay.details.date = sanitizeHtml(essay.details.date);
	essay.details.student_name = sanitizeHtml(essay.details.student_name);
	essay.details.lecture_name = sanitizeHtml(essay.details.lecture_name);
	essay.details.student_id = sanitizeHtml(essay.details.student_id);
	essay.details.course_number = sanitizeHtml(essay.details.course_number);

	//	For each vocab word
	essay.vocabulary = essay.vocabulary.map((word) => {

		//	Return clean string
		return sanitizeHtml(word);

	})

	//	Sanitize essay text
	essay.essay = sanitizeHtml(essay.essay);

	//	Sanitize essay settings
	settings.page_numbers = sanitizeHtml(settings.page_numbers);
	settings.cover_page = sanitizeHtml(settings.cover_page);
	settings.essay_title = sanitizeHtml(settings.essay_title);
	settings.word_count = sanitizeHtml(settings.word_count);
	settings.new_line = sanitizeHtml(settings.new_line);

	//	Sanitize font settings
	settings.font_family = sanitizeHtml(settings.font_family);
	settings.font_size = sanitizeHtml(settings.font_size);
	settings.font_color = sanitizeHtml(settings.font_color);

	//	Sanitize line settings
	settings.line_spacing = sanitizeHtml(settings.line_spacing);
	settings.paragraph_spacing = sanitizeHtml(settings.paragraph_spacing);

	//	Sanitize margin settings
	settings.margin_spacing = sanitizeHtml(settings.margin_spacing);

	//	Sanitize highlight settings
	settings.highlight_type = sanitizeHtml(settings.highlight_type);

	//	Return clean data
	return { essay, settings };

}

//	Export functions
module.exports = {
	submit_essay_processor
}