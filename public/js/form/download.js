//	Subscribe event to buttons
$(`.essay_form .download.stage .restart_button`).on('click', restart_form_page);
$(`.essay_form .download.stage .download_button`).on('click', handle_download_file);

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

	}

}