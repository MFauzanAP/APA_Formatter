//	Get reference to modal instance
var modal = $(`.modal`);

//	Subscribe methods to modal elements
$(`.modal`).on('click', (e) => { if (e.target !== e.currentTarget) return; hide_modal(); });
$(`.modal .buttons .cancel`).on('click', hide_modal);
$(`.modal .buttons .confirm`).on('click', hide_modal);
$(`.modal .buttons .okay`).on('click', hide_modal);

//	Function used to show modal
function show_modal (type) {

	//	Fix body page
	$(`body`).addClass('fixed');

	//	Reset modal classes
	modal[0].className = `modal active`;

	//	Add classes from type
	modal.addClass(type);

}

//	Function used to hide modal
function hide_modal () {

	//	Reset body page
	$(`body`).removeClass('fixed');

	//	Close modal
	modal.removeClass('active');

	//	Reset modal classes and hide after modal closes
	setTimeout(() => modal[0].className = `modal`, 1000)

}