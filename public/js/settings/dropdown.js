//	Store reference to related elements
var settings_button = $(`.navbar .buttons .settings.dropdown.button`);

//	Subscribe on click event to settings button
$(window).on('click', close_settings_menu);
$(settings_button).on('click', handle_settings_dropdown);

//	Function called to handle profile dropdown click
function handle_settings_dropdown (e) {

	console.log('settings');

	//	Get dropdown menu tabs
	var tabs = $(`.navbar .buttons .menu .tabs`);

	//	Show set up slide
	tabs.css({transform: 'translateX(0)'});

	//	Open or close dropdown menu depending on current state
	menu.addClass('active');

}

//	Function called to close menu
function close_settings_menu (e) {

	//	If menu is not open then dont do anything
	if (!menu.hasClass('active')) return

	//	If targetting menu or button then dont close menu
	if (settings_button[0].contains(e.target) || profile_button[0].contains(e.target) || menu[0].contains(e.target)) return;

	console.log('closing settings');

	//	Close menu
	menu.removeClass('active');

}