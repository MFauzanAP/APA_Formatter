//	Subscribe functions to control buttons on click event
$(`.controls .continue`).on('click', on_click_forward);
$(` .controls .back`).on('click', on_click_backward);

//	Update stage ui once
update_stage_ui(new URL(window.location).searchParams.get('stage'));

//	Function called when the continue button is clicked.
function on_click_forward () {

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Call stage handler
	var res = true;
	if (stage == 'details') var res = handle_details();

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