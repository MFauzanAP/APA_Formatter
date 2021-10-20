//	Subscribe function to reset button
$(`.dashboard .windows .settings .reset`).on('click', () => show_modal({type: `confirm tiny center`, title: 'Reset Settings', message: 'Are you sure you want to reset the settings?'}, null, reset_settings));

//	Function called to reset the settings
function reset_settings () {

	//	Reset essay settings
	window.localStorage.removeItem('essay_settings_page_numbers');
	window.localStorage.removeItem('essay_settings_cover_page');
	window.localStorage.removeItem('essay_settings_essay_title');
	window.localStorage.removeItem('essay_settings_word_count');
	window.localStorage.removeItem('essay_settings_inline_details');
	window.localStorage.removeItem('essay_settings_new_line');

	//	Reset font settings
	window.localStorage.removeItem('essay_settings_font_family');
	window.localStorage.removeItem('essay_settings_font_size');
	window.localStorage.removeItem('essay_settings_font_color');

	//	Reset line settings
	window.localStorage.removeItem('essay_settings_line_spacing');
	window.localStorage.removeItem('essay_settings_paragraph_spacing');

	//	Reset margin settings
	window.localStorage.removeItem('essay_settings_margin_spacing');

	//	Reset highlighting settings
	window.localStorage.removeItem('essay_settings_highlight_type');

	//	Show toast
	show_toast('success', 'Settings successfully reset.');

	//	Update ui
	update_settings_ui();

}

//	Function called to update settings ui
function update_settings_ui () {

	//	Get settings
	var menu = $(`.dashboard .windows .settings`);

	//	Update essay settings values
	$(`#essay_settings_page_numbers`, menu).prop('checked', (window.localStorage.getItem('essay_settings_page_numbers') || 'true') === 'true');
	$(`#essay_settings_cover_page`, menu).prop('checked', (window.localStorage.getItem('essay_settings_cover_page') || 'true') === 'true');
	$(`#essay_settings_essay_title`, menu).prop('checked', (window.localStorage.getItem('essay_settings_essay_title') || 'true') === 'true');
	$(`#essay_settings_word_count`, menu).prop('checked', (window.localStorage.getItem('essay_settings_word_count') || 'true') === 'true');
	$(`#essay_settings_inline_details`, menu).prop('checked', (window.localStorage.getItem('essay_settings_inline_details') || 'false') === 'true');
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