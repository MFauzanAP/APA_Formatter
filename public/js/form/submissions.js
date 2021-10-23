//	Function called to create a new submission
function create_new_submission () {

	//	Get all submissions
	var submissions = JSON.parse(window.localStorage.getItem('submissions')) || [];

	//	Create entry
	submissions.push(essay);

	//	Save to local storage
	window.localStorage.setItem('submissions', JSON.stringify(submissions));

	//	Reset local essay settings
	reset_local_settings();

}

//	Function called to save the current essay object to local storage
function save_current_submission () {

	//	Get all submissions
	var submissions = JSON.parse(window.localStorage.getItem('submissions')) || [];

	//	Variable to hold whether there was a submission saved already
	var index = -1;

	//	Loop through each submission and check if it matches
	submissions.forEach((submission, i) => {

		//	If id matches then set index
		if (submission.id == essay.id) index = i;

	})

	//	Save submission
	if (index == -1) submissions.push(essay);
	else submissions[index] = essay;

	//	Save to local storage
	window.localStorage.setItem('submissions', JSON.stringify(submissions));

}