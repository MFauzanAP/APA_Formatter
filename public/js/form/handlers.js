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

	//	Return successful
	return true;

}