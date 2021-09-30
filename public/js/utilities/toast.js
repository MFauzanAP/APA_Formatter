//	Declare icons
var icons = {
	'error'			: '<i class="fa fa-exclamation-circle"></i>',
	'success'		: '<i class="fa fa-check-circle"></i>',
	'info'			: '<i class="fa fa-question-circle"></i>',
}

//	Function called to show the toast
function show_toast(type, message, duration = 2000) {

	//	Find toast element
	var toast = $(`.toast`);

	//	Set type
	toast[0].className = `toast ${type} active`;

	//	Set icon
	$(`.icon`, toast).html(icons[type]);

	//	Set title
	$(`.title`, toast).html(capitalise_string(type));

	//	Set message
	$(`.message`, toast).html(message);

	//	Hide after duration
	setTimeout(() => {

		//	Hide toast
		toast.removeClass('active');

	}, duration);

}