//	Function called to create a new submission
function create_new_submission () {

	//	Get all submissions
	var submissions = JSON.parse(window.localStorage.getItem('submissions')) || [];

	//	Reset essay object
	essay = {
		id			: id,
		details			: {
			title			: '',
			date			: '',
			lecturer_name		: '',
			course_number		: '',
			institution		: window.localStorage.getItem('institution') || 'Qatar University',
			students		: []
		},
		vocabulary		: [],
		essay			: '',
		settings		: {
			page_numbers		: window.localStorage.getItem('local_essay_settings_page_numbers') || 'true',
			cover_page		: window.localStorage.getItem('local_essay_settings_cover_page') || 'true',
			essay_title		: window.localStorage.getItem('local_essay_settings_essay_title') || 'true',
			word_count		: window.localStorage.getItem('local_essay_settings_word_count') || 'true',
			inline_details		: window.localStorage.getItem('local_essay_settings_inline_details') || 'false',
			new_line		: window.localStorage.getItem('local_essay_settings_new_line') || 'false',
			font_family		: window.localStorage.getItem('local_essay_settings_font_family') || 'Times New Roman',
			font_size		: window.localStorage.getItem('local_essay_settings_font_size') || '12',
			font_color		: window.localStorage.getItem('local_essay_settings_font_color') || '000000',
			line_spacing		: window.localStorage.getItem('local_essay_settings_line_spacing') || '2',
			paragraph_spacing	: window.localStorage.getItem('local_essay_settings_paragraph_spacing') || '0',
			margin_spacing		: window.localStorage.getItem('local_essay_settings_margin_spacing') || '1',
			highlight_type		: window.localStorage.getItem('local_essay_settings_highlight_type') || 'bold',
			vocab_word_limit	: parseInt($(`#vocab_word_limit`).val()) || 999999,
		}
	};

	//	Create entry
	submissions.push(essay);

	//	Save to local storage
	window.localStorage.setItem('submissions', JSON.stringify(submissions));

	//	Reset local essay settings
	reset_local_settings();

}

//	Function called to save the current essay object to local storage
function save_current_submission () {

	//	Get all submissions
	var submissions = JSON.parse(window.localStorage.getItem('submissions')) || [];

	//	Variable to hold whether there was a submission saved already
	var index = -1;

	//	Loop through each submission and check if it matches
	submissions.forEach((submission, i) => {

		//	If id matches then set index
		if (submission.id == essay.id) index = i;

	})

	//	Save submission
	if (index == -1) submissions.push(essay);
	else submissions[index] = essay;

	//	Save to local storage
	window.localStorage.setItem('submissions', JSON.stringify(submissions));

}