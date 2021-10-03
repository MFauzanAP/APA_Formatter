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

	//	Update tab and step ui
	update_tab_ui(tab);

}

//	Function called to update tab ui
function update_tab_ui (tab) {

	//	Get all tabs
	var tabs = $(`.tab`);

	//	Turn off all tabs
	tabs.removeClass(`active`);

	//	Get index of this tab
	var index = tabs.index($(`.${tab}.tab`)[0]);

	//	Move menu background based on current tab
	$(`.menu_bar .tabs .background`).css({transform: `translateY(${(index - 2) * 60}px)`});

	//	Set active tab
	tabs[index].classList.add('active');

	//	Scroll back to top
	window.scrollTo(0, 0);

}