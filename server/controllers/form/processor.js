'use strict';

//	Imports
const sanitizeHtml = require('sanitize-html');

/**	Processes data for an essay and sanitizes all data
 * 	@param {object} data Object containing essay data
 */
function submit_essay_processor (data) {

	//	Sanitize essay details
	data.details.title = sanitizeHtml(data.details.title);
	data.details.date = sanitizeHtml(data.details.date);
	data.details.student_name = sanitizeHtml(data.details.student_name);
	data.details.lecture_name = sanitizeHtml(data.details.lecture_name);
	data.details.student_id = sanitizeHtml(data.details.student_id);
	data.details.course_number = sanitizeHtml(data.details.course_number);

	//	For each vocab word
	data.vocabulary = data.vocabulary.map((word) => {

		//	Return clean string
		return sanitizeHtml(word);

	})

	//	Sanitize essay text
	data.essay = sanitizeHtml(data.essay);

	//	Return clean data
	return data;

}

//	Export functions
module.exports = {
	submit_essay_processor
}