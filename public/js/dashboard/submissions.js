//	Subscribe functions to window load event
$(window).on('load', update_submissions_ui);

//	Function called to update the submission list
function update_submissions_ui () {

	//	Get container
	var container = $(`.dashboard .windows .submissions .container`);

	//	Get all submissions
	var submissions = JSON.parse(window.localStorage.getItem('submissions')) || [];

	//	Variable to hold the output html
	var html = ``;

	//	Loop through each submission
	submissions.forEach(submission => {

		//	Submission entry html
		var entry_html = `
			<div class="entry">
				<div class="watermark">ESSAY</div>
				<div class="underline"></div>
				<div class="header">
					<div class="title">${submission.details.title || 'N/A'}</div>
					<div class="date">${submission.details.date.replaceAll('-', '/') || 'N/A'}</div>
				</div>
				<div class="snippet">${submission.essay || 'N/A'}</div>
				<div class="controls">
					<button class="delete" id="${submission.id}"><i class="far fa-trash-alt"></i></button>
					<a href="/?stage=details&id=${submission.id}"><button class="view">View</button></a>
				</div>
			</div>
			`;
		
		//	Add to output list
		html += entry_html;

	})

	//	Set submission html
	$(container).html(html);

	//	Subscribe functions to buttons
	$(`.delete`, container).on('click', (e) => {

		//	Get id
		var id = e.target.id;
		
		//	Show modal
		show_modal({ type: `small center confirm`, title: 'Delete Submission', message: `Are you sure you want to delete this submission?`}, null, () => on_delete_submission(id))
	
	});

}

//	Function called when delete button is clicked
function on_delete_submission (id) {

	//	Get all submissions
	var submissions = JSON.parse(window.localStorage.getItem('submissions')) || [];

	//	Variable to hold whether there was a submission saved already
	var index = -1;

	//	Loop through each submission and check if it matches
	submissions.forEach((submission, i) => {

		//	If id matches then set index
		if (submission.id == id) index = i;

	})

	//	If there was a submission saved
	if (index != -1) {

		//	Delete submission
		submissions.splice(index, 1);

		//	Show toast
		show_toast('success', 'Submission successfully deleted');

	}
	else {

		//	Show toast
		show_toast('error', 'Submission not found');

	}

	//	Save submissions
	window.localStorage.setItem('submissions', JSON.stringify(submissions));

	//	Update submissions ui
	update_submissions_ui();

}