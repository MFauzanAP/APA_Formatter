//	Add listener for url change
window.addEventListener('popstate', update_state);
window.addEventListener('DOMContentLoaded', update_state);

//	Function called to update state
function update_state () {

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Declare list of class names for each url
	var class_names = {
		''		: '',
		'details'	: 'details'
	};

	//	Get form page and reset class
	var form = document.querySelector('.form_page');
	form.className = 'form_page';

	//	Add class to form depending on stage
	if (stage) form.classList.add(class_names[stage]);

}