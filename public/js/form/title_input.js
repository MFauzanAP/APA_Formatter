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

//	Subscribe function to submit button on click event
$(`.essay_input .settings.button`).on('click', () => show_modal({ type: `long big center confirm`, title: 'Essay Settings', message: settings_html }, null, null));
$(`.essay_input .confirm.button`).on('click', on_submit_title);
$(`.essay_input input#title`).on('keyup', on_title_keyup);

//	Function called when the submit essay title button is clicked.
function on_submit_title () {

	//	Get title from input
	var title = $(`.essay_input input#title`).val();

	//	If title is empty
	if (!title) {

		//	Shake title
		shake(`.essay_input input#title`, 250);

		//	Show toast
		show_toast('error', 'Please enter an essay title before continuing.', 3000);

		//	Exit function
		return;

	}

	//	Hide previous page and show essay form
	$(`.form_page`).addClass('details');

	//	Add title to title input of form
	$(`.essay_form input#title`).val(title)

	//	Update stage ui
	update_stage_ui('details');
	update_steps_ui('details');

	//	Get date picker input
	var date_picker = $(`.details .input.date input`);

	//	Set initial date of essay if not already set
	if (!date_picker.val()) date_picker[0].valueAsDate = new Date();

	//	Set initial value of id and name
	$(`.essay_form .authors .table_input input#student_name`)[0].value = window.localStorage.getItem('name');
	$(`.essay_form .authors .table_input input#student_id`)[0].value = window.localStorage.getItem('id');

	//	Change history state
	history.pushState({}, '', window.location.pathname + '?stage=details');

}

//	Function called when a key is pressed while entering the title
function on_title_keyup (event) {

	//	If enter key is pressed then try submitting the title
	if (event.key == 'Enter') on_submit_title();

}