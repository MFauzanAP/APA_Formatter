//	Subscribe functions to control buttons on click event
$(`.controls .continue`).on('click', on_click_forward);
$(` .controls .back`).on('click', on_click_backward);

//	Function called when the continue button is clicked.
function on_click_forward () {

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Call stage handler
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

	//	Go back to previous stage
	$(`.form_page`).removeClass(stage);
	$(`.form_page`).addClass(stages[stage]);

	//	Change history state
	history.pushState({}, '', window.location.pathname + (stages[stage] ? `?stage=${stages[stage]}` : ''));

}