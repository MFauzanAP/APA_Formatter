//	Get reference to modal instance
var modal = $(`.modal`);

//	Subscribe methods to modal elements
modal.on('click', (e) => { if (e.target !== e.currentTarget) return; close_callback = null; hide_modal(e); });
$(`.buttons .cancel`, modal).on('click', (e) => { close_callback = null; hide_modal(e); });
$(`.buttons .confirm`, modal).on('click', hide_modal);
$(`.buttons .okay`, modal).on('click', hide_modal);

//	Variable to hold close callback function
var close_callback = null;

//	Function used to show modal
function show_modal (data = { type: '', title: '', message: '' }, callback = null, c_callback = null) {

	//	Fix body page
	$(`body`).addClass('fixed');

	//	Reset modal classes
	modal[0].className = `modal active`;

	//	Add classes from type
	modal.addClass(data.type);

	//	Set modal title
	$(`.header .title`, modal).html(data.title || 'Title');

	//	Set modal message
	$(`.body .message`, modal).html(data.message || 'Message');

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