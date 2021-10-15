//	Subscribe function to all settings
$(`.navbar .buttons .menu .settings_tab .row input[type="checkbox"]`).on('change', handle_checkbox_setting);
$(`.navbar .buttons .menu .settings_tab .row input[type="number"]`).on('input', handle_numeric_setting);
$(`.navbar .buttons .menu .settings_tab .row input[type="color"]`).on('input', handle_color_setting);
$(`.navbar .buttons .menu .settings_tab .row select`).on('change', handle_dropdown_setting);

//	Function called when a checkbox setting is clicked
function handle_checkbox_setting () {

	//	Get checkbox state
	var state = this.checked;

	//	Update local storage
	window.localStorage.setItem(this.id, state);

}

//	Function called when a numeric setting is changed
function handle_numeric_setting () {

	//	Get input value
	var value = Math.min(parseFloat($(this).prop('max')), Math.max(parseFloat($(this).prop('min')), this.value));

	//	Update value if outside range
	if (parseFloat(this.value) < parseFloat($(this).prop('min')) || parseFloat(this.value) > parseFloat($(this).prop('max'))) this.value = value;

	//	Update local storage
	window.localStorage.setItem(this.id, value);

}

//	Function called when a color setting is changed
function handle_color_setting () {

	//	Get input value
	var value = this.value;

	//	Update local storage
	window.localStorage.setItem(this.id, value.replace('#', ''));

}

//	Function called when a dropdown setting is changed
function handle_dropdown_setting () {

	//	Get input value
	var value = this.value;

	//	Update local storage
	window.localStorage.setItem(this.id, value);

}