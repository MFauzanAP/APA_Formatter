//	Declare essay settings html
var settings_html = `
	<div class="settings"><div class="essay section">
		<div class="title">Essay Settings</div>
		<div class="row">
			<label for="local_essay_settings_page_numbers">Page Numbers</label>
			<div class="checkbox">
				<input type="checkbox" name="local_essay_settings_page_numbers" id="local_essay_settings_page_numbers" checked="">
				<label for="local_essay_settings_page_numbers"></label>
			</div>
		</div>
		<div class="row">
			<label for="local_essay_settings_cover_page">Cover Page</label>
			<div class="checkbox">
				<input type="checkbox" name="local_essay_settings_cover_page" id="local_essay_settings_cover_page" checked="">
				<label for="local_essay_settings_cover_page"></label>
			</div>
		</div>
		<div class="row">
			<label for="local_essay_settings_essay_title">Essay Title</label>
			<div class="checkbox">
				<input type="checkbox" name="local_essay_settings_essay_title" id="local_essay_settings_essay_title" checked="">
				<label for="local_essay_settings_essay_title"></label>
			</div>
		</div>
		<div class="row">
			<label for="local_essay_settings_word_count">Word Count</label>
			<div class="checkbox">
				<input type="checkbox" name="local_essay_settings_word_count" id="local_essay_settings_word_count" checked="">
				<label for="local_essay_settings_word_count"></label>
			</div>
		</div>
		<div class="row">
			<label for="local_essay_settings_inline_details">Inline Student Details</label>
			<div class="checkbox">
				<input type="checkbox" name="local_essay_settings_inline_details" id="local_essay_settings_inline_details">
				<label for="local_essay_settings_inline_details"></label>
			</div>
		</div>
		<div class="row">
			<label for="local_essay_settings_new_line">New Line After Paragraph?</label>
			<div class="checkbox">
				<input type="checkbox" name="local_essay_settings_new_line" id="local_essay_settings_new_line">
				<label for="local_essay_settings_new_line"></label>
			</div>
		</div>
		<div class="underline"></div>
	</div>
	<div class="font section">
		<div class="title">Font Settings</div>
		<div class="row">
			<label for="local_essay_settings_font_family">Font Family</label>
			<div class="dropdown">
				<select name="local_essay_settings_font_family" id="local_essay_settings_font_family">
					<option value="Times New Roman">Times New Roman</option>
					<option value="Arial">Arial</option>
					<option value="Calibri">Calibri</option>
				</select>
			</div>
		</div>
		<div class="row">
			<label for="local_essay_settings_font_size">Font Size</label>
			<div class="input">
				<input type="number" name="local_essay_settings_font_size" id="local_essay_settings_font_size" value="12" step="1" min="8" max="32">
				<label class="unit">px</label>
			</div>
		</div>
		<div class="row">
			<label for="local_essay_settings_font_color">Font Color</label>
			<div class="input">
				<input type="color" name="local_essay_settings_font_color" id="local_essay_settings_font_color">
			</div>
		</div>
		<div class="underline"></div>
	</div>
	<div class="line section">
		<div class="title">Line Settings</div>
		<div class="row">
			<label for="local_essay_settings_line_spacing">Line Spacing</label>
			<div class="input">
				<input type="number" name="local_essay_settings_line_spacing" id="local_essay_settings_line_spacing" value="2" min="1" max="2">
				<label class="unit">lines</label>
			</div>
		</div>
		<div class="row">
			<label for="local_essay_settings_paragraph_spacing">Paragraph Spacing</label>
			<div class="input">
				<input type="number" name="local_essay_settings_paragraph_spacing" id="local_essay_settings_paragraph_spacing" value="0" min="0" max="2">
				<label class="unit">lines</label>
			</div>
		</div>
		<div class="underline"></div>
	</div>
	<div class="margin section">
		<div class="title">Margin Settings</div>
		<div class="row">
			<label for="local_essay_settings_margin_spacing">Margin Spacing</label>
			<div class="input">
				<input type="number" name="local_essay_settings_margin_spacing" id="local_essay_settings_margin_spacing" value="1" min="0" max="3">
				<label class="unit">inch</label>
			</div>
		</div>
		<div class="underline"></div>
	</div>
	<div class="highlight section">
		<div class="title">Highlight Settings</div>
		<div class="row">
			<label for="local_essay_settings_highlight_type">Highlight Type</label>
			<div class="dropdown">
				<select name="local_essay_settings_highlight_type" id="local_essay_settings_highlight_type">
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
$(`.essay_input .settings.button`).on('click', () => show_modal({ type: `long big center okay`, title: 'Essay Settings', message: settings_html }, () => setup_settings_modal(true)));
$(`.essay_form .controls .settings`).on('click', () => show_modal({ type: `long big center okay`, title: 'Essay Settings', message: settings_html }, () => setup_settings_modal(false)));

//	Function called to setup settings modal
function setup_settings_modal (initial) {

	//	Update settings values
	update_essay_settings_value(initial);

	//	If submission not yet created
	if (initial) {

		//	Subscribe on click functions to settings elements
		$(`.modal .message .settings .row input[type="checkbox"]`).on('change', handle_checkbox_setting);
		$(`.modal .message .settings .row input[type="number"]`).on('input', handle_numeric_setting);
		$(`.modal .message .settings .row input[type="color"]`).on('input', handle_color_setting);
		$(`.modal .message .settings .row select`).on('change', handle_dropdown_setting);

	}
	else {

		//	Subscribe on click functions to settings elements
		$(`.modal .message .settings .row input[type="checkbox"]`).on('change', handle_essay_checkbox_setting);
		$(`.modal .message .settings .row input[type="number"]`).on('input', handle_essay_numeric_setting);
		$(`.modal .message .settings .row input[type="color"]`).on('input', handle_essay_color_setting);
		$(`.modal .message .settings .row select`).on('change', handle_essay_dropdown_setting);

	}

}

//	Function called to update settings
function update_essay_settings_value (initial) {

	//	Get modal
	var modal = $(`.modal .message .settings`);

	//	If submission not yet created
	if (initial) {

		//	Update essay settings values
		$(`#local_essay_settings_page_numbers`, modal).prop('checked', ((window.localStorage.getItem('local_essay_settings_page_numbers') || window.localStorage.getItem('essay_settings_page_numbers')) || 'true') === 'true');
		$(`#local_essay_settings_cover_page`, modal).prop('checked', ((window.localStorage.getItem('local_essay_settings_cover_page') || window.localStorage.getItem('essay_settings_cover_page')) || 'true') === 'true');
		$(`#local_essay_settings_essay_title`, modal).prop('checked', ((window.localStorage.getItem('local_essay_settings_essay_title') || window.localStorage.getItem('essay_settings_essay_title')) || 'true') === 'true');
		$(`#local_essay_settings_word_count`, modal).prop('checked', ((window.localStorage.getItem('local_essay_settings_word_count') || window.localStorage.getItem('essay_settings_word_count')) || 'true') === 'true');
		$(`#local_essay_settings_inline_details`, modal).prop('checked', ((window.localStorage.getItem('local_essay_settings_inline_details') || window.localStorage.getItem('essay_settings_inline_details')) || 'false') === 'true');
		$(`#local_essay_settings_new_line`, modal).prop('checked', ((window.localStorage.getItem('local_essay_settings_new_line') || window.localStorage.getItem('essay_settings_new_line')) || 'false') === 'true');

		//	Update font settings values
		$(`#local_essay_settings_font_family`, modal).val((window.localStorage.getItem('local_essay_settings_font_family') || window.localStorage.getItem('essay_settings_font_family')) || 'Times New Roman');
		$(`#local_essay_settings_font_size`, modal).val((window.localStorage.getItem('local_essay_settings_font_size') || window.localStorage.getItem('essay_settings_font_size')) || '12');
		$(`#local_essay_settings_font_color`, modal).val(`#${(window.localStorage.getItem('local_essay_settings_font_color') || window.localStorage.getItem('essay_settings_font_color')) || '000000'}`);

		//	Update line settings values
		$(`#local_essay_settings_line_spacing`, modal).val((window.localStorage.getItem('local_essay_settings_line_spacing') || window.localStorage.getItem('essay_settings_line_spacing')) || '2');
		$(`#local_essay_settings_paragraph_spacing`, modal).val((window.localStorage.getItem('local_essay_settings_paragraph_spacing') || window.localStorage.getItem('essay_settings_paragraph_spacing')) || '0');

		//	Update margin settings values
		$(`#local_essay_settings_margin_spacing`, modal).val((window.localStorage.getItem('local_essay_settings_margin_spacing') || window.localStorage.getItem('essay_settings_margin_spacing')) || '1');

		//	Update highlight settings values
		$(`#local_essay_settings_highlight_type`, modal).val((window.localStorage.getItem('local_essay_settings_highlight_type') || window.localStorage.getItem('essay_settings_highlight_type')) || 'bold');

	}
	else {

		//	Update essay settings values
		$(`#local_essay_settings_page_numbers`, modal).prop('checked', (essay.settings.page_numbers || 'true') === 'true');
		$(`#local_essay_settings_cover_page`, modal).prop('checked', (essay.settings.cover_page || 'true') === 'true');
		$(`#local_essay_settings_essay_title`, modal).prop('checked', (essay.settings.essay_title || 'true') === 'true');
		$(`#local_essay_settings_word_count`, modal).prop('checked', (essay.settings.word_count || 'true') === 'true');
		$(`#local_essay_settings_inline_details`, modal).prop('checked', (essay.settings.inline_details || 'false') === 'true');
		$(`#local_essay_settings_new_line`, modal).prop('checked', (essay.settings.new_line || 'false') === 'true');

		//	Update font settings values
		$(`#local_essay_settings_font_family`, modal).val(essay.settings.font_family || 'Times New Roman');
		$(`#local_essay_settings_font_size`, modal).val(essay.settings.font_size || '12');
		$(`#local_essay_settings_font_color`, modal).val(`#${essay.settings.font_color || '000000'}`);

		//	Update line settings values
		$(`#local_essay_settings_line_spacing`, modal).val(essay.settings.line_spacing || '2');
		$(`#local_essay_settings_paragraph_spacing`, modal).val(essay.settings.paragraph_spacing || '0');

		//	Update margin settings values
		$(`#local_essay_settings_margin_spacing`, modal).val(essay.settings.margin_spacing || '1');

		//	Update highlight settings values
		$(`#local_essay_settings_highlight_type`, modal).val(essay.settings.highlight_type || 'bold');

	}

}

//	Function called when a checkbox setting is clicked
function handle_essay_checkbox_setting () {

	//	Get checkbox state
	var state = this.checked;

	//	Update essay settings
	essay.settings[this.id.replace('local_essay_settings_', '')] = state;

	//	Save essay submission
	save_current_submission();

}

//	Function called when a numeric setting is changed
function handle_essay_numeric_setting () {

	//	Get input value
	var value = Math.min(parseFloat($(this).prop('max')), Math.max(parseFloat($(this).prop('min')), this.value));

	//	Update value if outside range
	if (parseFloat(this.value) < parseFloat($(this).prop('min')) || parseFloat(this.value) > parseFloat($(this).prop('max'))) this.value = value;

	//	Update essay settings
	essay.settings[this.id.replace('local_essay_settings_', '')] = value;

	//	Save essay submission
	save_current_submission();

}

//	Function called when a color setting is changed
function handle_essay_color_setting () {

	//	Get input value
	var value = this.value;

	//	Update essay settings
	essay.settings[this.id.replace('local_essay_settings_', '')] = value.replace('#', '');

	//	Save essay submission
	save_current_submission();

}

//	Function called when a dropdown setting is changed
function handle_essay_dropdown_setting () {

	//	Get input value
	var value = this.value;

	//	Update essay settings
	essay.settings[this.id.replace('local_essay_settings_', '')] = value;

	//	Save essay submission
	save_current_submission();

}

//	Function called to reset local settings
function reset_local_settings () {

	//	Reset essay settings
	window.localStorage.removeItem('local_essay_settings_page_numbers');
	window.localStorage.removeItem('local_essay_settings_cover_page');
	window.localStorage.removeItem('local_essay_settings_essay_title');
	window.localStorage.removeItem('local_essay_settings_word_count');
	window.localStorage.removeItem('local_essay_settings_inline_details');
	window.localStorage.removeItem('local_essay_settings_new_line');

	//	Reset font settings
	window.localStorage.removeItem('local_essay_settings_font_family');
	window.localStorage.removeItem('local_essay_settings_font_size');
	window.localStorage.removeItem('local_essay_settings_font_color');

	//	Reset line settings
	window.localStorage.removeItem('local_essay_settings_line_spacing');
	window.localStorage.removeItem('local_essay_settings_paragraph_spacing');

	//	Reset margin settings
	window.localStorage.removeItem('local_essay_settings_margin_spacing');

	//	Reset highlighting settings
	window.localStorage.removeItem('local_essay_settings_highlight_type');

}