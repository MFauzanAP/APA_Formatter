//	Store reference to related elements
var profile_button = $(`.navbar .buttons .profile.dropdown.button`);
var menu = $(`.navbar .menu`);

//	Subscribe on click event to profile button
$(window).on('click', close_profile_menu);
$(profile_button).on('click', handle_profile_dropdown);
$(`.navbar .buttons .menu .logout`).on('click', handle_profile_logout);

//	Function called to handle profile dropdown click
function handle_profile_dropdown (e) {

	console.log('profile');

	//	Get dropdown menu tabs
	var tabs = $(`.navbar .buttons .menu .tabs`);

	//	Show set up slide
	tabs.css({transform: 'translateX(-100%)'});

	//	Open dropdown menu
	menu.addClass('active');

	//	Handle profile setup if not already setup
	if (!window.localStorage.getItem('name')) handle_profile_setup();

	//	Get student details
	details = $(`.navbar .buttons .menu .student_details`);

	//	Update details
	$(`.id`, details).html(`#${window.localStorage.getItem('id')}`);
	$(`.name`, details).html(window.localStorage.getItem('name'));
	$(`.institution`, details).html(window.localStorage.getItem('institution'));

}

//	Function called to close menu
function close_profile_menu (e) {

	//	If menu is not open then dont do anything
	if (!menu.hasClass('active')) return

	//	If targetting menu or button then dont close menu
	if (settings_button[0].contains(e.target) || profile_button[0].contains(e.target) || menu[0].contains(e.target)) return;

	console.log('closing profile');

	//	Close menu
	menu.removeClass('active');

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