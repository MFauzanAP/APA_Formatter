//	Add listener for url change
window.addEventListener('popstate', update_state);
window.addEventListener('DOMContentLoaded', update_state);

//	Function called to update state
function update_state () {

	//	Get current tab
	var tab = new URL(window.location).searchParams.get('tab');

	//	Get dashboard and reset class
	var dashboard = document.querySelector('.dashboard');
	dashboard.className = 'dashboard';

	//	Add class to dashboard
	dashboard.classList.add(tab);

	//	Discard any profile changes
	discard_edit_profile();

	//	Update tab and step ui
	update_tab_ui(tab);

}

//	Function called to update tab ui
function update_tab_ui (tab) {

	//	Get all tabs and windows
	var tabs = $(`.tab`);
	var windows = $(`.window`);

	//	Turn off all tabs and windows
	tabs.removeClass(`active`);
	windows.removeClass(`active`);

	//	Get index of this tab
	var index = tabs.index($(`.${tab}.tab`)[0]);

	//	Move menu background and window based on current tab
	$(`.menu_bar .tabs .background`).css({transform: `translateY(${(index - 1.5) * 60}px)`});
	$(`.windows`).css({transform: `translateY(-${index * 100}vh)`});

	//	Set active tab and window
	tabs[index].classList.add('active');
	windows[index].classList.add('active');

	//	Scroll back to top
	window.scrollTo(0, 0);

}