//	Subscribe function to edit buttons
$(`.dashboard .windows .profile .edit`).on('click', handle_edit_profile);
$(`.dashboard .windows .profile .overlay .discard`).on('click', discard_edit_profile);
$(`.dashboard .windows .profile .overlay .confirm`).on('click', confirm_edit_profile);

//	Function called when the edit button is clicked
function handle_edit_profile () {

	//	Make the respective input field editable
	$(`.dashboard .windows .profile input`).prop('readonly', false);

	//	Show unsaved changes message
	$(`.dashboard .windows .profile .overlay`).addClass('active');

}

//	Function called when the discard button is clicked while editing
function discard_edit_profile () {

	//	Update profile UI
	update_profile_ui();

	//	Make everything readonly
	$(`.dashboard .windows .profile input`).prop('readonly', true);

	//	Hide unsaved changes message
	$(`.dashboard .windows .profile .overlay`).removeClass('active');

}

//	Function called when the confirm button is clicked while editing
function confirm_edit_profile () {

	//	Get input elements
	var name_input = $(`.dashboard .windows .profile input#name`);
	var id_input = $(`.dashboard .windows .profile input#student_id`);
	var institution_input = $(`.dashboard .windows .profile input#institution`);

	//	Save changes
	window.localStorage.setItem('name', name_input.val())
	window.localStorage.setItem('id', id_input.val())
	window.localStorage.setItem('institution', institution_input.val())

	//	Update profile UI
	update_profile_ui();

	//	Make everything readonly
	$(`.dashboard .windows .profile input`).prop('readonly', true);

	//	Hide unsaved changes message
	$(`.dashboard .windows .profile .overlay`).removeClass('active');

}

//	Function called to update profile ui
function update_profile_ui () {

	//	Get input elements
	var name_input = $(`.dashboard .windows .profile input#name`);
	var id_input = $(`.dashboard .windows .profile input#student_id`);
	var institution_input = $(`.dashboard .windows .profile input#institution`);

	//	Update user profile input values
	name_input.val(window.localStorage.getItem('name'));
	id_input.val(window.localStorage.getItem('id'));
	institution_input.val(window.localStorage.getItem('institution'));

}