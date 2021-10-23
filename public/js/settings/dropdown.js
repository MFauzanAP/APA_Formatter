//	Store reference to related elements
var settings_button = $(`.navbar .buttons .settings.dropdown.button`);

//	Subscribe on click event to settings button
$(window).on('click', close_settings_menu);
$(settings_button).on('click', handle_settings_dropdown);

//	Function called to handle profile dropdown click
function handle_settings_dropdown (e) {

	//	Get dropdown menu tabs
	var tabs = $(`.navbar .buttons .menu .tabs`);

	//	Show set up slide
	tabs.css({transform: 'translateX(0)'});

	//	Open or close dropdown menu depending on current state
	menu.addClass('active');

	//	Update settings
	update_settings_value();

}

//	Function called to update settings
function update_settings_value () {

	//	Get dropdown menu
	var menu = $(`.navbar .buttons .menu .settings_tab`);

	//	Update site settings
	$(`#settings_alerts`, menu).prop('checked', (window.localStorage.getItem('settings_alerts') || 'true') === 'true');
	$(`#settings_autofill_details`, menu).prop('checked', (window.localStorage.getItem('settings_autofill_details') || 'true') === 'true');
	$(`#settings_dark_theme`, menu).prop('checked', (window.localStorage.getItem('settings_dark_theme') || 'false') === 'true');

}

//	Function called to close menu
function close_settings_menu (e) {

	//	If menu is not open then dont do anything
	if (!menu.hasClass('active')) return

	//	If targetting menu or button then dont close menu
	if (settings_button[0].contains(e.target) || profile_button[0].contains(e.target) || menu[0].contains(e.target)) return;

	//	Close menu
	menu.removeClass('active');

}