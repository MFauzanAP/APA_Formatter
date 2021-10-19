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