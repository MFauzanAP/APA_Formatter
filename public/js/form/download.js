//	Subscribe event to buttons
$(`.essay_form .download.stage .restart_button`).on('click', restart_form_page);
$(`.essay_form .download.stage .download_button`).on('click', handle_download_file);
$(`.essay_form .download.stage .more_info_button`).on('click', handle_essay_info);

//	Subscribe event to on before unload
$(window).on('visibilitychange', reset_download);

//	Variable holding path to the file
var download_path = '';

//	Function called to reset download path
function reset_download () {

	//	If there is no download path then exit
	if (!download_path) return;

	//	Delete the previously made word document
	fetch('/api/form/delete', {
		method			: 'POST',
		keepalive		: true,
		body			: JSON.stringify({ path: download_path }),
		headers			: {
			'Content-Type'		: 'application/json'
		}
	});

	//	Reset download path
	download_path = '';

}

//	Function called to restart the essay format process
async function restart_form_page () {

	//	Reset all inputs
	$(`input`).val('');
	$(`textarea`).val('');

	//	Generate unique id
	var id = new Uint32Array(5);
	window.crypto.getRandomValues(id);
	id = id.join('');

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

	//	Reset table
	num_entries = 0;
	$(`.essay_form .authors .table_input tbody tr`).remove();
	handle_add_table_entry();

	//	Reset download path
	reset_download();

	//	Update stage ui
	update_stage_ui('');
	update_steps_ui('');

	//	Go back to title input page
	$(`.form_page`).removeClass('download');
	$(`.form_page`).addClass('');

	//	Change history state
	history.pushState({}, '', window.location.pathname);

}

//	Function called to properly handle the file download process
function handle_download_file (e) {

	//	If there is no file to download
	if (!download_path) {
		
		//	Cancel download
		e.preventDefault();

		//	Show toast
		show_toast('error', 'There is no formatted essay available. Please restart the process and try again.', 4000);

		//	Exit
		return;

	}

	//	Show toast
	show_toast('success', 'Your essay has been successfully downloaded.');

}

//	Function to handle viewing more information about essay
function handle_essay_info () {

	//	If there is no essay
	if (!download_path) {

		//	Show toast
		show_toast('error', 'There is no formatted essay available. Please restart the process and try again.', 4000);

		//	Exit
		return;

	}

	//	Generate essay information
	var info = '';

	//	Calculate data
	var chars = essay.essay.split('').length;
	var words = essay.essay.match(/\S+/g).length;
	var paragraphs = essay.essay.split('\n').filter(paragraph => paragraph != '').length;
	var reading = words / 250;
	var speaking = words / 130;

	//	Add character count
	info += `<p>${chars} characters</p>`;

	//	Add word count
	info += `<p>${words} words</p>`;

	//	Add paragraph count
	info += `<p>${paragraphs} paragraphs</p>`;

	//	Add reading time
	info += `<p>${Math.floor(reading)} min ${Math.round((reading - Math.floor(reading)) * 60)} sec reading time</p>`;

	//	Add speaking time
	info += `<p>${Math.floor(speaking)} min ${Math.round((speaking - Math.floor(speaking)) * 60)} sec speaking time</p>`;

	//	Add highlighted words
	info += `<p>${highlights.length} highlighted words - ${highlights.join(', ')}</p>`;

	//	Show modal
	show_modal({ type: `center okay`, title: 'Essay Information', message: info })

}