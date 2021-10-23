//	Subscribe functions to window load event
$(window).on('load', update_submissions_ui);

//	Function called to update the submission list
function update_submissions_ui () {

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
				<div class="header">
					<div class="title">${submission.details.title || 'N/A'}</div>
					<div class="date">${submission.details.date.replaceAll('-', '/') || 'N/A'}</div>
				</div>
				<div class="underline"></div>
				<div class="snippet">${submission.essay || 'N/A'}</div>
				<div class="controls">
					<button class="delete" id="${submission.id}"><i class="far fa-trash-alt"></i></button>
					<button class="view" id="${submission.id}">View</button>
				</div>
			</div>
			`;
		
		//	Add to output list
		html += entry_html;

	})

	//	Set submission html
	$(`.dashboard .windows .submissions .container`).html(html);

}