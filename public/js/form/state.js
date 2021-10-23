//	Add listener for url change
window.addEventListener('popstate', update_state);
window.addEventListener('DOMContentLoaded', update_state);

//	Subscribe to on leave event
window.onbeforeunload = leave_prompt;

//	Function called when user tries to leave the page
function leave_prompt () {

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Declare array of stages to check for
	var checks = ['details', 'authors', 'vocabulary', 'essay'];

	//	If on a stage that has user input and essay hasnt been saved then ask user if they want to leave
	if (checks.includes(stage) && !essay.saved) return 'You still have unsaved changes. Are you sure you want to leave?';

}

//	Function called to update state
function update_state () {

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Get current id
	var id = new URL(window.location).searchParams.get('id');

	//	Get form page and reset class
	var form = document.querySelector('.form_page');
	form.className = 'form_page';

	//	If there is id then update form values
	if (id) update_form_values(id);

	//	Add class to form depending on stage
	if (stage) form.classList.add(stage);

	//	Update stage and step ui
	update_stage_ui(stage);
	update_steps_ui(stage);

}

//	Function called to update stage ui
function update_stage_ui (stage) {

	//	Get current scroll position
	var scroll_pos = window.scrollY;

	//	Get all stage ui
	var stages = $(`.stage`);

	//	Turn off all stages
	stages.removeClass(`active left right`);

	//	If stage is empty then exit
	if (!stage) return;

	//	Get index of this stage
	var index = stages.index($(`.${stage}.stage`)[0]);

	//	Move stages based on index
	stages.each((i, stage) => {

		//	If on the left of the current stage
		if (i < index) stage.classList.add('left');
		
		//	If on the right of the current stage
		if (i > index) stage.classList.add('right');

		//	If this is the current stage
		if (i == index) stage.classList.add('active');

	})

	//	Scroll back to original position
	window.scrollTo(0, scroll_pos);

}

//	Function called to update steps ui
function update_steps_ui (stage) {

	//	Get all steps
	var steps = $(`.stepper .step`);

	//	Get all stage ui
	var stages = $(`.stage`);

	//	Reset all steps
	steps.removeClass(`in_progress done`);

	//	If stage is empty then exit
	if (!stage) return;

	//	Get index of this stage
	var index = stages.index($(`.${stage}.stage`)[0]);

	//	Update slider
	$(`.stepper`).css('background-position-x', `${90 - (index * 24)}%`)

	//	Update steps
	steps.each((i, step) => {

		//	If on the left or if this is the final stage then set as done
		if (i < index || index == steps.length - 1) step.classList.add('done');

		//	If this is the current stage
		if (i == index) step.classList.add('in_progress');

	})

}