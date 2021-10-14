//	Variable to hold the data for the essay
var essay = {
	details			: {
		title			: '',
		date			: '',
		student_name		: '',
		lecturer_name		: '',
		student_id		: '',
		course_number		: '',
		institution		: ''
	},
	vocabulary		: [],
	essay			: '',
};

//	Variable to hold highlighted words
var highlights = [];

//	Function used to submit the data to the server
async function submit_essay () {

	//	Update institution value
	essay.details.institution = window.localStorage.getItem('institution') || 'Qatar University';

	//	Extract settings from local storage
	settings = {
		page_numbers		: (window.localStorage.getItem('essay_settings_page_numbers') || 'true') === 'true',
		cover_page		: (window.localStorage.getItem('essay_settings_cover_page') || 'true') === 'true',
		essay_title		: (window.localStorage.getItem('essay_settings_essay_title') || 'true') === 'true',
		word_count		: (window.localStorage.getItem('essay_settings_word_count') || 'true') === 'true',
		new_line		: (window.localStorage.getItem('essay_settings_new_line') || 'true') === 'true',
		font_family		: window.localStorage.getItem('essay_settings_font_family') || 'Times New Roman',
		font_size		: window.localStorage.getItem('essay_settings_font_size') || '12',
		font_color		: window.localStorage.getItem('essay_settings_font_color') || '000000',
		line_spacing		: window.localStorage.getItem('essay_settings_line_spacing') || '2',
		paragraph_spacing	: window.localStorage.getItem('essay_settings_paragraph_spacing') || '0',
		margin_spacing		: window.localStorage.getItem('essay_settings_margin_spacing') || '1',
		highlight_type		: window.localStorage.getItem('essay_settings_highlight_type') || 'bold',
	}

	//	Call api to submit essay to be processed
	var response = await fetch('/api/form/submit', {
		method			: 'POST',
		body			: JSON.stringify({essay, settings}),
		headers			: {
			'Content-Type'		: 'application/json'
		}
	});

	//	Extract response data
	response = await response.json();
	const { file_name, words } = response.body;

	//	Set download path and highlights
	download_path = file_name;
	highlights = words;
	
	//	Show a toast if there werent enough vocab words used
	if (words.length < 4 && essay.vocabulary.length >= 4) show_toast('info', 'Your essay did not use enough words from the vocabulary.');

	//	If successful
	if (response.status == 'success') {

		//	Update download link
		$(`.form_page .download.stage .download_link`).attr('href', `/static/word/${download_path}.docx`)

		//	Update stage ui
		update_stage_ui('download');
		update_steps_ui('download');

		//	Go to next stage
		$(`.form_page`).removeClass('formatting');
		$(`.form_page`).addClass('download');

		//	Change history state
		history.pushState({}, '', window.location.pathname + `?stage=download`);

	}
	else if (response.status == 'fail') {

		//	Update stage ui
		update_stage_ui('essay');
		update_steps_ui('essay');

		//	Go to previous stage
		$(`.form_page`).removeClass('formatting');
		$(`.form_page`).addClass('essay');

		//	Change history state
		history.pushState({}, '', window.location.pathname + `?stage=essay`);

		//	Show toast
		show_toast('error', 'There was something wrong with your request. Please try again.');
		
	}

}