//	Subscribe function to sign up form submit event
$(`.navbar .menu .signup_tab .form`).on('submit', handle_profile_submit);

//	Function called to check if user profile needs setting up
function handle_profile_setup () {

	//	Get dropdown menu tabs
	var tabs = $(`.navbar .buttons .menu .tabs`);

	//	Show set up slide
	tabs.css({transform: 'translateX(-200%)'});

}

//	Function called to handle the sign up form submission
function handle_profile_submit (e) {

	//	Prevent page reload
	e.preventDefault();

	//	Extract data from the form
	var name = e.target[0].value;
	var id = e.target[1].value;
	var institution = e.target[2].value;

	//	Add profile details to local storage
	window.localStorage.setItem('name', name);
	window.localStorage.setItem('id', id);
	window.localStorage.setItem('institution', institution);

	//	Clear form values
	$(`.navbar .buttons .menu .tabs .signup_tab input`).val('');

	//	Get dropdown menu tabs
	var tabs = $(`.navbar .buttons .menu .tabs`);

	//	Show profile slide
	tabs.css({transform: 'translateX(-100%)'});

	//	Get student details
	details = $(`.navbar .buttons .menu .student_details`);

	//	Update details
	$(`.id`, details).html(`#${window.localStorage.getItem('id')}`);
	$(`.name`, details).html(window.localStorage.getItem('name'));
	$(`.institution`, details).html(window.localStorage.getItem('institution'));

}