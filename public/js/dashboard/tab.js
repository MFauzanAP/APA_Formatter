//	Subscribe functions to window on load
$(window).on('load', update_profile_ui);
$(window).on('load', update_settings_ui);

//	Subscribe functions to tab on click event
$(`.tabs .tab:nth-of-type(1)`).on('click', { index: 0 }, on_click_tab);
$(`.tabs .tab:nth-of-type(2)`).on('click', { index: 1 }, on_click_tab);
$(`.tabs .tab:nth-of-type(3)`).on('click', { index: 2 }, on_click_tab);
$(`.tabs .tab:nth-of-type(4)`).on('click', { index: 3 }, on_click_tab);

//	Function called when tab is clicked
function on_click_tab (event) {

	//	Get index
	var index = event.data.index;

	//	Declare array of tabs
	var tabs = [ 'profile', 'courses', 'formats', 'settings' ];

	//	Change history state
	history.pushState({}, '', window.location.pathname + `?tab=${tabs[index]}`);

	//	Update state
	update_state();

}