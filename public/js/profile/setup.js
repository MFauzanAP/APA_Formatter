//	Function called to check if user profile needs setting up
function handle_profile_setup () {

	//	Get dropdown menu tabs
	var tabs = $(`.navbar .buttons .menu .tabs`);

	//	Show set up slide
	tabs.css({transform: 'translateX(-100%)'});

}