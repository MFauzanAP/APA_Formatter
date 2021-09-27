//	Subscribe function to submit button on click event
$(`div.button`).on('click', on_submit_title);

//	Function called when the submit essay title button is clicked.
function on_submit_title () {

	//	Get title from input
	var title = $(`.essay_input input#title`).val();

	//	Make input be read-only
	$(`.essay_input input#title`).prop('readonly', true);

	//	Hide previous page and show essay form
	$(`.form_page`).addClass('active');

	//	Add title to title input of form
	$(`.essay_form input#title`).val(title)

	//	Change history state
	history.pushState({}, '', window.location.pathname + '#form');

}