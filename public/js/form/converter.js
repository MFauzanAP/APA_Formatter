//	Generate unique id
id = new Uint32Array(5);
window.crypto.getRandomValues(id);
id = id.join('');

//	Variable to hold the data for the essay
var essay = {
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
		page_numbers		: window.localStorage.getItem('essay_settings_page_numbers') || 'true',
		cover_page		: window.localStorage.getItem('essay_settings_cover_page') || 'true',
		essay_title		: window.localStorage.getItem('essay_settings_essay_title') || 'true',
		word_count		: window.localStorage.getItem('essay_settings_word_count') || 'true',
		inline_details		: window.localStorage.getItem('essay_settings_inline_details') || 'false',
		new_line		: window.localStorage.getItem('essay_settings_new_line') || 'false',
		font_family		: window.localStorage.getItem('essay_settings_font_family') || 'Times New Roman',
		font_size		: window.localStorage.getItem('essay_settings_font_size') || '12',
		font_color		: window.localStorage.getItem('essay_settings_font_color') || '000000',
		line_spacing		: window.localStorage.getItem('essay_settings_line_spacing') || '2',
		paragraph_spacing	: window.localStorage.getItem('essay_settings_paragraph_spacing') || '0',
		margin_spacing		: window.localStorage.getItem('essay_settings_margin_spacing') || '1',
		highlight_type		: window.localStorage.getItem('essay_settings_highlight_type') || 'bold',
		vocab_word_limit	: parseInt($(`#vocab_word_limit`).val()) || 999999,
	}
};

//	Variable to hold highlighted words
var highlights = [];

//	Function used to submit the data to the server
async function submit_essay () {

	//	Extract settings from local storage
	settings = {
		page_numbers		: essay.settings.page_numbers === 'true',
		cover_page		: essay.settings.cover_page === 'true',
		essay_title		: essay.settings.essay_title === 'true',
		word_count		: essay.settings.word_count === 'true',
		inline_details		: essay.settings.inline_details === 'true',
		new_line		: essay.settings.new_line === 'true',
		font_family		: essay.settings.font_family,
		font_size		: essay.settings.font_size,
		font_color		: essay.settings.font_color,
		line_spacing		: essay.settings.line_spacing,
		paragraph_spacing	: essay.settings.paragraph_spacing,
		margin_spacing		: essay.settings.margin_spacing,
		highlight_type		: essay.settings.highlight_type,
		vocab_word_limit	: parseInt($(`#vocab_word_limit`).val()) || 999999,
	};

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
	if (words.length < settings.vocab_word_limit && essay.vocabulary.length >= settings.vocab_word_limit) show_toast('info', 'Your essay did not use enough words from the vocabulary.');

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