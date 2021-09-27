//	Subscribe functions to control buttons on click event
$(`.details .controls .continue`).on('click', on_submit_details);
$(`.details .controls .back`).on('click', on_exit_details);

//	Function called when the continue button is clicked.
function on_submit_details () {

	//	Get details from form
	var data = $(`.essay_form .details .form`).serializeArray();

	//	Show next step
	$(`.form_page`).removeClass('details');
	$(`.form_page`).addClass('vocabulary');

	//	Change history state
	history.pushState({}, '', window.location.pathname + '?stage=vocabulary');

}

//      Function called when the back button is clicked.
function on_exit_details () {

        //      Go back to home page
        $(`.form_page`).removeClass('details');

        //	Change history state
	history.pushState({}, '', window.location.pathname);

}