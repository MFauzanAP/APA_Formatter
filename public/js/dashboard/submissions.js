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
					<button class="download" id="${submission.id}"><i class="fa fa-download"></i></button>
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
	$(`.download`, container).on('click', async (e) => {

		//	Get id
		var id = e.target.id;

		//	Call handler
		on_download_submission(id);

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

//	Function called when download button is clicked
async function on_download_submission (id) {

	//	Add loading indicator
	$(`.dashboard .windows .submissions .container .download`).html(`<i class="fa fa-spin fa-spinner"></i>`)
	$(`.dashboard .windows .submissions .container .download`).css('pointer-events', 'none');

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

		//	Get submission data
		var data = submissions[index];

		//	Check if there arent any empty fields
		if (handle_submmission(data)) {

			//	Extract settings from local storage
			settings = {
				page_numbers		: data.settings.page_numbers === 'true',
				cover_page		: data.settings.cover_page === 'true',
				essay_title		: data.settings.essay_title === 'true',
				word_count		: data.settings.word_count === 'true',
				inline_details		: data.settings.inline_details === 'true',
				new_line		: data.settings.new_line === 'true',
				font_family		: data.settings.font_family,
				font_size		: data.settings.font_size,
				font_color		: data.settings.font_color,
				line_spacing		: data.settings.line_spacing,
				paragraph_spacing	: data.settings.paragraph_spacing,
				margin_spacing		: data.settings.margin_spacing,
				highlight_type		: data.settings.highlight_type,
				vocab_word_limit	: data.settings.vocab_word_limit,
			};

			//	Call api to submit essay to be processed
			var response = await fetch('/api/form/submit', {
				method			: 'POST',
				body			: JSON.stringify({essay: data, settings}),
				headers			: {
					'Content-Type'		: 'application/json'
				}
			});

			//	Extract response data
			response = await response.json();
			const { file_name } = response.body;

			//	Create a new link and download the file
			var link = document.createElement('a');
			link.download = 'Formatted Essay.docx';
			link.href = `/static/word/${file_name}.docx`;
			document.body.appendChild(link);

			//	Click download link
			link.click();
			document.body.removeChild(link);

			//	Delete the previously made word document
			setTimeout(() => fetch('/api/form/delete', {
				method			: 'POST',
				keepalive		: true,
				body			: JSON.stringify({ path: file_name }),
				headers			: {
					'Content-Type'		: 'application/json'
				}
			}), 1000);

		}
		else {

			//	Show toast
			show_toast('error', 'Submission is incomplete');

		}

	}
	else {

		//	Show toast
		show_toast('error', 'Submission not found');

	}

	//	Remove loading indicator
	$(`.dashboard .windows .submissions .container .download`).html(`<i class="fa fa-download"></i>`)
	$(`.dashboard .windows .submissions .container .download`).css('pointer-events', 'all');

}