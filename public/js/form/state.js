//	Add listener for url change
window.addEventListener('popstate', update_state);
window.addEventListener('DOMContentLoaded', update_state);

//	Function called to update state
function update_state () {

	//	Get current stage
	var stage = new URL(window.location).searchParams.get('stage');

	//	Get form page and reset class
	var form = document.querySelector('.form_page');
	form.className = 'form_page';

	//	Add class to form depending on stage
	if (stage) form.classList.add(stage);

	//	Update stage and step ui
	update_stage_ui(stage);
	update_steps_ui(stage);

}

//	Function called to update stage ui
function update_stage_ui (stage) {

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