//	Store reference to related elements
var button = $(`.navbar .buttons .profile.dropdown.button`);
var menu = $(`.navbar .menu`);

//	Subscribe on click event to profile button
$(window).on('click', handle_profile_dropdown);
$(`.navbar .buttons .menu .logout`).on('click', handle_profile_logout);

//	Function called to handle profile dropdown click
function handle_profile_dropdown (e) {

	//	If targetting menu then exit function
	if (menu[0].contains(e.target)) return;

	//	If not clicking button or menu and the dropdown is closed
	if (!button[0].contains(e.target) && !menu.hasClass('active')) return;

	//	Open or close dropdown menu depending on current state
	menu.toggleClass('active');

	//	Handle profile setup if not already setup
	if (!window.localStorage.getItem('name')) handle_profile_setup();

	//	Get student details
	details = $(`.navbar .buttons .menu .student_details`);

	//	Update details
	$(`.id`, details).html(`#${window.localStorage.getItem('id')}`);
	$(`.name`, details).html(window.localStorage.getItem('name'));
	$(`.institution`, details).html(window.localStorage.getItem('institution'));

}

//	Function called to log out
function handle_profile_logout () {

	//	Delete local storage values
	window.localStorage.removeItem('name');
	window.localStorage.removeItem('id');
	window.localStorage.removeItem('institution');

	//	Show sign up button
	handle_profile_setup();

}