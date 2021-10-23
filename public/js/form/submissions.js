//	Subscribe function to control s
$(window).on('keydown', handle_save_command)

//	Function called to create a new submission
function create_new_submission () {

	//	Reset essay object
	essay = {
		id			: id,
		saved			: true,
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
			page_numbers		: (window.localStorage.getItem('local_essay_settings_page_numbers') || window.localStorage.getItem('essay_settings_page_numbers')) || 'true',
			cover_page		: (window.localStorage.getItem('local_essay_settings_cover_page') || window.localStorage.getItem('essay_settings_cover_page')) || 'true',
			essay_title		: (window.localStorage.getItem('local_essay_settings_essay_title') || window.localStorage.getItem('essay_settings_essay_title')) || 'true',
			word_count		: (window.localStorage.getItem('local_essay_settings_word_count') || window.localStorage.getItem('essay_settings_word_count')) || 'true',
			inline_details		: (window.localStorage.getItem('local_essay_settings_inline_details') || window.localStorage.getItem('essay_settings_inline_details')) || 'false',
			new_line		: (window.localStorage.getItem('local_essay_settings_new_line') || window.localStorage.getItem('essay_settings_new_line')) || 'false',
			font_family		: (window.localStorage.getItem('local_essay_settings_font_family') || window.localStorage.getItem('essay_settings_font_family')) || 'Times New Roman',
			font_size		: (window.localStorage.getItem('local_essay_settings_font_size') || window.localStorage.getItem('essay_settings_font_size')) || '12',
			font_color		: (window.localStorage.getItem('local_essay_settings_font_color') || window.localStorage.getItem('essay_settings_font_color')) || '000000',
			line_spacing		: (window.localStorage.getItem('local_essay_settings_line_spacing') || window.localStorage.getItem('essay_settings_line_spacing')) || '2',
			paragraph_spacing	: (window.localStorage.getItem('local_essay_settings_paragraph_spacing') || window.localStorage.getItem('essay_settings_paragraph_spacing')) || '0',
			margin_spacing		: (window.localStorage.getItem('local_essay_settings_margin_spacing') || window.localStorage.getItem('essay_settings_margin_spacing')) || '1',
			highlight_type		: (window.localStorage.getItem('local_essay_settings_highlight_type') || window.localStorage.getItem('essay_settings_highlight_type')) || 'bold',
			vocab_word_limit	: parseInt($(`#vocab_word_limit`).val()) || 999999,
		}
	};

	//	Reset local essay settings
	reset_local_settings();

}

//	Function called to save the current essay object to local storage
function save_current_submission () {

	//	Get all submissions
	var submissions = JSON.parse(window.localStorage.getItem('submissions')) || [];

	//	Update essay object
	update_essay_object();

	//	Set essay saved state
	essay.saved = true;

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

//	Function called to update form values
function update_form_values (id) {

	//	Get all submissions
	var submissions = JSON.parse(window.localStorage.getItem('submissions')) || [];

	//	Variable to hold whether there was a submission saved already
	var index = -1;

	//	Loop through each submission and check if it matches
	submissions.forEach((submission, i) => {

		//	If id matches then set index
		if (submission.id == id) index = i;

	})

	//	If there is a match found
	if (index != -1) {

		//	Update essay object
		essay = submissions[index];

		//	Update form input values
		$(`.essay_form .details.stage input#title`).val(essay.details.title);
		$(`.essay_form .details.stage input#date`).val(essay.details.date);
		$(`.essay_form .details.stage input#lecturer_name`).val(essay.details.lecturer_name);
		$(`.essay_form .details.stage input#course_number`).val(essay.details.course_number);

		//	Set students table
		set_table_entries(essay.details.students);

		//	Update vocabulary values
		$(`.essay_form .vocabulary.stage input#vocab_word_limit`).val(essay.settings.vocab_word_limit == 999999 ? 0 : essay.settings.vocab_word_limit);
		$(`.essay_form .vocabulary.stage textarea#vocab_list`).val(essay.vocabulary.join('\n'));

		//	Update essay values
		$(`.essay_form .essay.stage textarea#essay_text`).val(essay.essay);

	}

}

//	Function called to update the essay object with form data
function update_essay_object () {

	//	Get details from form
	var data = $(`.essay_form .details .form`).serializeArray();

	//	Loop through each value inside the form and process into the proper format
	data.forEach(elem => {

		//	Update essay object with the new values
		essay.details[elem.name] = elem.value;

	});
	//	Add authors to essay object
	essay.details.students = get_table_data();

	//	Get vocabulary from text area
	var data = $(`.essay_form .vocabulary textarea`).val();

	//	Replace all multiple spaces with single spaces
	data = data.replace(/\s+/g, ' ');

	//	Split the data by spaces and loop through the words and delete any duplicates
	var words = [];
	data.split(' ').map((word, i) => {

		//	Add to words if its not already there and if not an empty word
		if (!words.includes(word) && word != '') words.push(word);

	});

	//	Clamp array length to 500 words
	if (words.length > 500) words.splice(500, words.length - 500);

	//	Add words to the essay object
	essay.vocabulary = words;
	essay.settings.vocab_word_limit = parseInt($(`#vocab_word_limit`).val()) || 999999;

	//	Add essay text to essay object
	essay.essay = $(`.essay_form .essay textarea`).val();
	
}

//	Function called to handle control save button
function handle_save_command (e) {

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Exit if not currently in any stage
	if (!stage) return

	//	If control and s key is pressed
	if (e.ctrlKey && String.fromCharCode(e.which).toLowerCase() == 's') {
		
		//	Stop browser from opening save dialog
		e.preventDefault(); 
		
		//	Save current submission
		save_current_submission();

		//	Show toast
		show_toast('success', 'Submission successfully saved');
	
	}

}