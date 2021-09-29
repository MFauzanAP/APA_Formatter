//	Function called to handle details stage, returns true when successful
function handle_details () {

	//	Get details from form
	var data = $(`.essay_form .details .form`).serializeArray();

	//	Loop through all inputs to make sure they arent empty
	for (let i = 0; i < data.length; i++) {

		//	Get input value
		const input = data[i];
		
		//	If we find an empty field then tell the user and return false
		if (!input.value) {

			//	Color this input field red
			color_input(`.essay_form .details input#${input.name}`)
			
			//	Return false
			return false;
		
		}

	};

	//	Loop through each value inside the form and process into the proper format
	data.forEach(elem => {

		//	Update essay object with the new values
		essay.details[elem.name] = elem.value;

	});

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

	//	Clamp array length to 100 words
	if (words.length > 100) words.splice(100, words.length - 100);

	//	Add words to the essay object
	essay.vocabulary = words;

	//	Return successful
	return true;

}

//	Function called to handle essay stage, returns true when successful
function handle_essay () {

	//	Get essay from text area
	var data = $(`.essay_form .essay textarea`).val();

	//	Make sure data is not empty
	if (!data) {

		//	Color this input field red
		color_input(`.essay_form .essay .input`);
		
		//	Return false
		return false;
	
	}

	//	Add essay text to essay object
	essay.essay = data;

	//	Make sure essay data is complete before being sent to the server
	var complete = true;
	complete = (essay.details.title && complete) ? true : false;
	complete = (essay.details.date && complete) ? true : false;
	complete = (essay.details.student_name && complete) ? true : false;
	complete = (essay.details.lecturer_name && complete) ? true : false;
	complete = (essay.details.student_id && complete) ? true : false;
	complete = (essay.details.course_number && complete) ? true : false;
	complete = (essay.essay && complete) ? true : false;

	//	Exit function if essay is incomplete
	if (!complete) {

		//	Exit
		return false;

	}

	//	Submit essay
	submit_essay();

	//	Return successful
	return true;

}