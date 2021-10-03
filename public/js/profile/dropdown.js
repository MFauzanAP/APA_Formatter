//	Store reference to related elements
var button = $(`.navbar .buttons .profile.dropdown.button`);
var menu = $(`.navbar .menu`);

//	Subscribe on click event to profile button
$(window).on('click', handle_profile_dropdown);

//	Function called to handle profile dropdown click
function handle_profile_dropdown (e) {

	//	If targetting menu then exit function
	if (menu[0].contains(e.target)) return;

	//	If not clicking button or menu and the dropdown is closed
	if (!button[0].contains(e.target) && !menu.hasClass('active')) return;

	//	Open or close dropdown menu depending on current state
	menu.toggleClass('active');

}