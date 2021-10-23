//	Declare essay settings html
var settings_html = `
	<div class="settings"><div class="essay section">
		<div class="title">Essay Settings</div>
		<div class="row">
			<label for="essay_settings_page_numbers">Page Numbers</label>
			<div class="checkbox">
				<input type="checkbox" name="essay_settings_page_numbers" id="essay_settings_page_numbers" checked="">
				<label for="essay_settings_page_numbers"></label>
			</div>
		</div>
		<div class="row">
			<label for="essay_settings_cover_page">Cover Page</label>
			<div class="checkbox">
				<input type="checkbox" name="essay_settings_cover_page" id="essay_settings_cover_page" checked="">
				<label for="essay_settings_cover_page"></label>
			</div>
		</div>
		<div class="row">
			<label for="essay_settings_essay_title">Essay Title</label>
			<div class="checkbox">
				<input type="checkbox" name="essay_settings_essay_title" id="essay_settings_essay_title" checked="">
				<label for="essay_settings_essay_title"></label>
			</div>
		</div>
		<div class="row">
			<label for="essay_settings_word_count">Word Count</label>
			<div class="checkbox">
				<input type="checkbox" name="essay_settings_word_count" id="essay_settings_word_count" checked="">
				<label for="essay_settings_word_count"></label>
			</div>
		</div>
		<div class="row">
			<label for="essay_settings_inline_details">Inline Student Details</label>
			<div class="checkbox">
				<input type="checkbox" name="essay_settings_inline_details" id="essay_settings_inline_details">
				<label for="essay_settings_inline_details"></label>
			</div>
		</div>
		<div class="row">
			<label for="essay_settings_new_line">New Line After Paragraph?</label>
			<div class="checkbox">
				<input type="checkbox" name="essay_settings_new_line" id="essay_settings_new_line">
				<label for="essay_settings_new_line"></label>
			</div>
		</div>
		<div class="underline"></div>
	</div>
	<div class="font section">
		<div class="title">Font Settings</div>
		<div class="row">
			<label for="essay_settings_font_family">Font Family</label>
			<div class="dropdown">
				<select name="essay_settings_font_family" id="essay_settings_font_family">
					<option value="Times New Roman">Times New Roman</option>
					<option value="Arial">Arial</option>
					<option value="Calibri">Calibri</option>
				</select>
			</div>
		</div>
		<div class="row">
			<label for="essay_settings_font_size">Font Size</label>
			<div class="input">
				<input type="number" name="essay_settings_font_size" id="essay_settings_font_size" value="12" step="1" min="8" max="32">
				<label class="unit">px</label>
			</div>
		</div>
		<div class="row">
			<label for="essay_settings_font_color">Font Color</label>
			<div class="input">
				<input type="color" name="essay_settings_font_color" id="essay_settings_font_color">
			</div>
		</div>
		<div class="underline"></div>
	</div>
	<div class="line section">
		<div class="title">Line Settings</div>
		<div class="row">
			<label for="essay_settings_line_spacing">Line Spacing</label>
			<div class="input">
				<input type="number" name="essay_settings_line_spacing" id="essay_settings_line_spacing" value="2" min="1" max="2">
				<label class="unit">lines</label>
			</div>
		</div>
		<div class="row">
			<label for="essay_settings_paragraph_spacing">Paragraph Spacing</label>
			<div class="input">
				<input type="number" name="essay_settings_paragraph_spacing" id="essay_settings_paragraph_spacing" value="0" min="0" max="2">
				<label class="unit">lines</label>
			</div>
		</div>
		<div class="underline"></div>
	</div>
	<div class="margin section">
		<div class="title">Margin Settings</div>
		<div class="row">
			<label for="essay_settings_margin_spacing">Margin Spacing</label>
			<div class="input">
				<input type="number" name="essay_settings_margin_spacing" id="essay_settings_margin_spacing" value="1" min="0" max="3">
				<label class="unit">inch</label>
			</div>
		</div>
		<div class="underline"></div>
	</div>
	<div class="highlight section">
		<div class="title">Highlight Settings</div>
		<div class="row">
			<label for="essay_settings_highlight_type">Highlight Type</label>
			<div class="dropdown">
				<select name="essay_settings_highlight_type" id="essay_settings_highlight_type">
					<option value="none">None</option>
					<option value="yellow highlight">Yellow Highlight</option>
					<option value="bold">Bold</option>
					<option value="italic">Italic</option>
					<option value="underline">Underline</option>
					<option value="strikethrough">Strikethrough</option>
					<option value="capitalise">Capitalise</option>
				</select>
			</div>
		</div>

	</div></div>
	`;

//	Subscribe function to settings buttons
$(`.essay_input .settings.button`).on('click', () => show_modal({ type: `long big center okay`, title: 'Essay Settings', message: settings_html }, setup_settings_modal));
$(`.essay_form .controls .settings`).on('click', () => show_modal({ type: `long big center okay`, title: 'Essay Settings', message: settings_html }, setup_settings_modal));

//	Function called to setup settings modal
function setup_settings_modal () {

	//	Update settings values
	update_essay_settings_value();

	//	Subscribe on click functions to settings elements
	$(`.modal .message .settings .row input[type="checkbox"]`).on('change', handle_checkbox_setting);
	$(`.modal .message .settings .row input[type="number"]`).on('input', handle_numeric_setting);
	$(`.modal .message .settings .row input[type="color"]`).on('input', handle_color_setting);
	$(`.modal .message .settings .row select`).on('change', handle_dropdown_setting);

}

//	Function called to update settings
function update_essay_settings_value () {

	//	Get modal
	var modal = $(`.modal .message .settings`);

	//	Update essay settings values
	$(`#essay_settings_page_numbers`, modal).prop('checked', (window.localStorage.getItem('essay_settings_page_numbers') || 'true') === 'true');
	$(`#essay_settings_cover_page`, modal).prop('checked', (window.localStorage.getItem('essay_settings_cover_page') || 'true') === 'true');
	$(`#essay_settings_essay_title`, modal).prop('checked', (window.localStorage.getItem('essay_settings_essay_title') || 'true') === 'true');
	$(`#essay_settings_word_count`, modal).prop('checked', (window.localStorage.getItem('essay_settings_word_count') || 'true') === 'true');
	$(`#essay_settings_inline_details`, modal).prop('checked', (window.localStorage.getItem('essay_settings_inline_details') || 'false') === 'true');
	$(`#essay_settings_new_line`, modal).prop('checked', (window.localStorage.getItem('essay_settings_new_line') || 'false') === 'true');

	//	Update font settings values
	$(`#essay_settings_font_family`, modal).val(window.localStorage.getItem('essay_settings_font_family') || 'Times New Roman');
	$(`#essay_settings_font_size`, modal).val(window.localStorage.getItem('essay_settings_font_size') || '12');
	$(`#essay_settings_font_color`, modal).val(`#${window.localStorage.getItem('essay_settings_font_color') || '000000'}`);

	//	Update line settings values
	$(`#essay_settings_line_spacing`, modal).val(window.localStorage.getItem('essay_settings_line_spacing') || '2');
	$(`#essay_settings_paragraph_spacing`, modal).val(window.localStorage.getItem('essay_settings_paragraph_spacing') || '0');

	//	Update margin settings values
	$(`#essay_settings_margin_spacing`, modal).val(window.localStorage.getItem('essay_settings_margin_spacing') || '1');

	//	Update highlight settings values
	$(`#essay_settings_highlight_type`, modal).val(window.localStorage.getItem('essay_settings_highlight_type') || 'bold');

}