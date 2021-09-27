//	Subscribe functions to control buttons on click event
$(`.details .controls .continue`).on('click', on_submit_details);
$(`.details .controls .back`).on('click', on_exit_details);

//	Function called when the continue button is clicked.
function on_submit_details () {

	//	Get title from input
	var title = $(`.essay_input input#title`).val();

	//	Hide previous page and show essay form
	$(`.form_page`).addClass('details');

	//	Add title to title input of form
	$(`.essay_form input#title`).val(title)

	//	Change history state
	history.pushState({}, '', window.location.pathname + '?stage=details');

}

//      Function called when the back button is clicked.
function on_exit_details () {

        //      Go back to home page
        $(`.form_page`).removeClass('details');

        //	Change history state
	history.pushState({}, '', window.location.pathname);

}