//	Add listener for url change
window.addEventListener('popstate', update_state);
window.addEventListener('DOMContentLoaded', update_state);

//	Function called to update state
function update_state () {

	//	Get current hash
	var hash = window.location.hash;

	//	Declare list of class names for each url
	var class_names = {
		''		: '',
		'#form'		: 'active'
	};

	//	Get form page and reset class
	var form = document.querySelector('.form_page');
	form.className = 'form_page';

	//	Add class to form depending on hash
	if (hash) form.classList.add(class_names[hash]);

}