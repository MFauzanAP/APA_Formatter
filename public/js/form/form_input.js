//	Subscribe functions to control buttons on click event
$(`.controls .continue`).on('click', on_click_forward);
$(`.controls .back`).on('click', on_click_backward);

//	Subscribe functions to stepper buttons on click event
$(`.stepper .step:nth-of-type(1)`).on('click', { index: 0 }, on_click_step);
$(`.stepper .step:nth-of-type(2)`).on('click', { index: 1 }, on_click_step);
$(`.stepper .step:nth-of-type(3)`).on('click', { index: 2 }, on_click_step);
$(`.stepper .step:nth-of-type(5)`).on('click', { index: 4 }, on_click_step);

//	Update stage ui once
update_stage_ui(new URL(window.location).searchParams.get('stage'));

//	Function called when the continue button is clicked.
function on_click_forward () {

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Call stage handler
	var res = true;
	if (stage == 'details') var res = handle_details();
	if (stage == 'vocabulary') var res = handle_vocabulary();
	if (stage == 'essay') var res = handle_essay();

	//	Exit function if validations fail
	if (!res) return;

	//	Declare array of stages
	var stages = {
		''			: 'details',
		'details'		: 'vocabulary',
		'vocabulary'		: 'essay',
		'essay'			: 'formatting',
		'formatting'		: 'download',
	}

	//	Update stage ui
	update_stage_ui(stages[stage]);
	update_steps_ui(stages[stage]);

	//	Go to next stage
	$(`.form_page`).removeClass(stage);
	$(`.form_page`).addClass(stages[stage]);

	//	Change history state
	history.pushState({}, '', window.location.pathname + `?stage=${stages[stage]}`);

}

//	Function called when the back button is clicked.
function on_click_backward () {

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Declare array of stages
	var stages = {
		'details'		: '',
		'vocabulary'		: 'details',
		'essay'			: 'vocabulary',
		'formatting'		: 'essay',
		'download'		: 'formatting',
	}

	//	Update stage ui
	update_stage_ui(stages[stage]);
	update_steps_ui(stages[stage]);

	//	Go back to previous stage
	$(`.form_page`).removeClass(stage);
	$(`.form_page`).addClass(stages[stage]);

	//	Change history state
	history.pushState({}, '', window.location.pathname + (stages[stage] ? `?stage=${stages[stage]}` : ''));

}

//	Function called when a step button is clicked
function on_click_step (event) {

	//	Get index
	var index = event.data.index;

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Declare array of stages
	var stages = [ 'details', 'vocabulary', 'essay', 'formatting', 'download' ];

	//	If going forward
	if (index > stages.indexOf(stage)) {

		//	Declare variable to check for errors
		var res = true;

		//	Go through each stage in front and try to validate
		for (let i = 0; i < index - stages.indexOf(stage); i++) {

			//	Get stage
			const stg = stages[i + stages.indexOf(stage)];

			//	Call event handler
			if (stg == 'details') var res = handle_details();
			if (stg == 'vocabulary') var res = handle_vocabulary();
			if (stg == 'essay') var res = handle_essay();

			//	Exit function if validations fail
			if (!res) return;
			
		}

	}

	//	If previous stage was download or formatting then reset download
	if (stage == 'download' || stage == 'formatting') reset_download();

	//	Update stage ui
	update_stage_ui(stages[index]);
	update_steps_ui(stages[index]);

	//	Go to next stage
	$(`.form_page`).removeClass(stage);
	$(`.form_page`).addClass(stages[index]);

	//	Change history state
	history.pushState({}, '', window.location.pathname + `?stage=${stages[index]}`);

}