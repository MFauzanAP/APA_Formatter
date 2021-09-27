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