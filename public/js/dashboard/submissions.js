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
	$(`.view`, container).on('click', on_view_submission);
	$(`.delete`, container).on('click', on_view_submission);

}

//	Function called when view button is clicked
function on_view_submission () {

}