//	Get reference to modal instance
var modal = $(`.modal`);

//	Subscribe methods to modal elements
$(`.modal`).on('click', (e) => { if (e.target !== e.currentTarget) return; hide_modal(e); });
$(`.modal .buttons .cancel`).on('click', (e) => { close_callback = null; hide_modal(e); });
$(`.modal .buttons .confirm`).on('click', hide_modal);
$(`.modal .buttons .okay`).on('click', hide_modal);

//	Variable to hold close callback function
var close_callback = null;

//	Function used to show modal
function show_modal (type, callback = null, c_callback = null) {

	//	Fix body page
	$(`body`).addClass('fixed');

	//	Reset modal classes
	modal[0].className = `modal active`;

	//	Add classes from type
	modal.addClass(type);

	//	Set close callback
	close_callback = c_callback;

	//	Call callback function
	if (callback) callback();

}

//	Function used to hide modal
function hide_modal (e, callback = null) {

	//	Reset body page
	$(`body`).removeClass('fixed');

	//	Close modal
	modal.removeClass('active');

	//	Call callback function
	if (callback) callback();
	if (close_callback) close_callback();

	//	Reset close callback
	close_callback = null;

	//	Reset modal classes and hide after modal closes
	setTimeout(() => modal[0].className = `modal`, 1000)

}