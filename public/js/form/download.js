//	Subscribe event to restart button on click
$(`.essay_form .download.stage .restart_button`).on('click', (event) => {

	//	Reset all inputs
	$(`input`).val('');
	$(`textarea`).val('');

	//	Update stage ui
	update_stage_ui('');
	update_steps_ui('');

	//	Go back to title input page
	$(`.form_page`).removeClass('download');
	$(`.form_page`).addClass('');

	//	Change history state
	history.pushState({}, '', window.location.pathname);

})