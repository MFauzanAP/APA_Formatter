//	Subscribe function to submit button on click event
$(`div.button`).on('click', on_submit_title);

//	Function called when the submit essay title button is clicked.
function on_submit_title () {

	//	Get title from input
	var title = $(`.essay_input input#title`).val();

	//	If title is empty
	if (!title) {

		//	Shake title
		shake(`.essay_input input#title`, 250);

		//	Show toast
		show_toast('error', 'Please enter an essay title before continuing.', 3000);

		//	Exit function
		return;

	}

	//	Hide previous page and show essay form
	$(`.form_page`).addClass('details');

	//	Add title to title input of form
	$(`.essay_form input#title`).val(title)

	//	Update stage ui
	update_stage_ui('details');
	update_steps_ui('details');

	//	Get date picker input
	var date_picker = $(`.details .input.date input`);

	//	Set initial date of essay if not already set
	if (!date_picker.val()) date_picker[0].valueAsDate = new Date();

	//	Change history state
	history.pushState({}, '', window.location.pathname + '?stage=details');

}