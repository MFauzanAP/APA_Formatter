//	Subscribe event to buttons
$(`.essay_form .download.stage .restart_button`).on('click', restart_form_page);
$(`.essay_form .download.stage .download_button`).on('click', handle_download_file);
$(`.essay_form .download.stage .more_info_button`).on('click', handle_essay_info);

//	Variable holding path to the file
var download_path = '';

//	Function called to restart the essay format process
function restart_form_page () {

	//	Reset all inputs
	$(`input`).val('');
	$(`textarea`).val('');

	//	Reset download path
	download_path = '';

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