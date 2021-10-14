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

	//	Update essay settings values
	$(`#essay_settings_page_numbers`, menu).prop('checked', (window.localStorage.getItem('essay_settings_page_numbers') || 'true') === 'true');
	$(`#essay_settings_cover_page`, menu).prop('checked', (window.localStorage.getItem('essay_settings_cover_page') || 'true') === 'true');
	$(`#essay_settings_essay_title`, menu).prop('checked', (window.localStorage.getItem('essay_settings_essay_title') || 'true') === 'true');
	$(`#essay_settings_word_count`, menu).prop('checked', (window.localStorage.getItem('essay_settings_word_count') || 'true') === 'true');
	$(`#essay_settings_new_line`, menu).prop('checked', (window.localStorage.getItem('essay_settings_new_line') || 'false') === 'true');

	//	Update font settings values
	$(`#essay_settings_font_family`, menu).val(window.localStorage.getItem('essay_settings_font_family') || 'Times New Roman');
	$(`#essay_settings_font_size`, menu).val(window.localStorage.getItem('essay_settings_font_size') || '12');
	$(`#essay_settings_font_color`, menu).val(`#${window.localStorage.getItem('essay_settings_font_color') || '000000'}`);

	//	Update line settings values
	$(`#essay_settings_line_spacing`, menu).val(window.localStorage.getItem('essay_settings_line_spacing') || '2');
	$(`#essay_settings_paragraph_spacing`, menu).val(window.localStorage.getItem('essay_settings_paragraph_spacing') || '0');

	//	Update margin settings values
	$(`#essay_settings_margin_spacing`, menu).val(window.localStorage.getItem('essay_settings_margin_spacing') || '1');

	//	Update highlight settings values
	$(`#essay_settings_highlight_type`, menu).val(window.localStorage.getItem('essay_settings_highlight_type') || 'bold');

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