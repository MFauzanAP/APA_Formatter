//	Function called to shake a input
function shake(selector, delay = 500, callback = null) {

	//	Find element
	var element = $(selector);

	//	Exit function if element is not found
	if (!element) return;

	//	Add shake class to element
	element.addClass('shake');

	//	Remove element after delay
	setTimeout(() => { element.removeClass('shake') }, delay);

	//	Call callback after delay has elapsed
	if (callback) setTimeout(callback(), delay);

}

//	Function called to color an input red
function color_input(selector, duration = 5000, callback = null) {

	//	Find element
	var element = $(selector);

	//	Exit function if element is not found
	if (!element) return;

	//	Change border color to red
	element.css('border-color', 'red');

	//	Subscrube an on click method to the element
	element.on('click', () => {

		//	Remove color
		element.css('border-color', '');

		//	Unsubscribe this event
		element.off('click');

	})

	//	Remove color after duration
	setTimeout(() => { element.css('border-color', '') }, duration);

	//	Call callback after duration has elapsed
	if (callback) setTimeout(callback(), duration);

}