//	Subscribe function to submit button on click event
$(`div.button`).on('click', on_submit_title);

//	Function called when the submit essay title button is clicked.
function on_submit_title () {

	//	Get title from input
	var title = $(`.essay_input input#title`).val();

	//	Hide previous page and show essay form
	$(`.form_page`).addClass('details');

	//	Add title to title input of form
	$(`.essay_form input#title`).val(title)

	//	Change history state
	history.pushState({}, '', window.location.pathname + '?stage=details');

}