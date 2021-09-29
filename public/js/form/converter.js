//	Variable to hold the data for the essay
var essay = {
	details			: {
		title			: '',
		date			: '',
		student_name		: '',
		lecturer_name		: '',
		student_id		: '',
		course_number		: ''
	},
	vocabulary		: [],
	essay			: '',
};

//	Function used to submit the data to the server
async function submit_essay () {

	//	Call api to submit essay to be processed
	var response = await fetch('/api/form/submit', {
		method			: 'POST',
		body			: JSON.stringify(essay),
		headers			: {
			'Content-Type'		: 'application/json'
		}
	});

	//	Extract response data
	response = await response.json();

	//	If successful
	if (response.status == 'success') {

		//	Update stage ui
		update_stage_ui('download');
		update_steps_ui('download');

		//	Go to next stage
		$(`.form_page`).removeClass('formatting');
		$(`.form_page`).addClass('download');

		//	Change history state
		history.pushState({}, '', window.location.pathname + `?stage=download`);

	}
	else {
		
	}

}