//	Function called to handle details stage, returns true when successful
function handle_details () {

	//	Get details from form
	var data = $(`.essay_form .details .form`).serializeArray();

	//	Loop through all inputs to make sure they arent empty
	for (let i = 0; i < data.length; i++) {

		//	Get input value
		const input = data[i];

		//	If this field is title and its empty then return false
		if (input.name == 'title' && input.value == '') {

			//	Color this input field red
			color_input(`.essay_form .details input#${input.name}`)

			//	Show toast
			show_toast('error', `Please fill in the ${capitalise_string(input.name.replace('_', ' '))} input field`, 3000);

			//	Return false
			return false;

		}

	};

	//	Loop through each value inside the form and process into the proper format
	data.forEach(elem => {

		//	Update essay object with the new values
		essay.details[elem.name] = elem.value;

	});

	//	Save essay
	save_current_submission();

	//	Return successful
	return true;

}

//	Function called to handle authors stage, returns true when successful
function handle_authors () {

	//	Get table data
	var data = get_table_data();

	//	Loop through each row and check for empty fields
	for (let index = 0; index < data.length; index++) {

		//	Get row
		const row = data[index];

		//	If name or id is empty then return false
		if (row.name == '') {
			
			//	Color this input field red
			color_input(`.essay_form .authors .table_input tbody tr:nth-child(${index + 1}) input#student_name`);

			//	Show toast
			show_toast('error', `Please fill in the name field at row ${index + 1}.`);

			//	Return false
			return false;

		}
		
		//	If name or id is empty then return false
		if (row.id == '') {
			
			//	Color this input field red
			color_input(`.essay_form .authors .table_input tbody tr:nth-child(${index + 1}) input#student_id`);

			//	Show toast
			show_toast('error', `Please fill in the ID field at row ${index + 1}.`);

			//	Return false
			return false;

		}

	}

	//	Add authors to essay object
	essay.details.students = data;

	//	Save essay
	save_current_submission();

	//	Return successful
	return true;

}

//	Function called to handle vocabulary stage, returns true when successful
function handle_vocabulary () {

	//	Get vocabulary from text area
	var data = $(`.essay_form .vocabulary textarea`).val();

	//	Replace all multiple spaces with single spaces
	data = data.replace(/\s+/g, ' ');

	//	Split the data by spaces and loop through the words and delete any duplicates
	var words = [];
	data.split(' ').map((word, i) => {

		//	Add to words if its not already there and if not an empty word
		if (!words.includes(word) && word != '') words.push(word);

	});

	//	Clamp array length to 500 words
	if (words.length > 500) words.splice(500, words.length - 500);

	//	Add words to the essay object
	essay.vocabulary = words;
	essay.settings.vocab_word_limit = parseInt($(`#vocab_word_limit`).val()) || 999999;

	//	Save essay
	save_current_submission();

	//	Return successful
	return true;

}

//	Function called to handle essay stage, returns true when successful
function handle_essay () {

	//	Get essay from text area
	var data = $(`.essay_form .essay textarea`).val();

	//	Make sure data is not empty
	if (!(data.replaceAll(' ', '').replaceAll('\n', ''))) {

		//	Color this input field red
		color_input(`.essay_form .essay .input`);

		//	Show toast
		show_toast('error', 'Please write your essay before submitting.');

		//	Return false
		return false;

	}

	//	Add essay text to essay object
	essay.essay = data;

	//	Save essay
	save_current_submission();

	//	Make sure essay data is complete before being sent to the server
	var complete = true;
	complete = (essay.details.title && complete) ? true : false;
	complete = (essay.essay && complete) ? true : false;

	//	Exit function if essay is incomplete
	if (!complete) {

		//	Show toast
		show_toast('error', 'Your essay is incomplete. Go back and try again.', 3000);

		//	Exit
		return false;

	}

	//	Submit essay
	submit_essay();

	//	Return successful
	return true;

}