//	Get reference to essay editor toolbar elements
const editor = $(`.essay_form .essay textarea`);
const word_count = $(`.essay_form .essay .word_count`);
const fullscreen_editor = $(`.modal .body textarea`);
const fullscreen_word_count = $(`.modal .body .word_count`);
const fullscreen_button = $(`.essay_form .essay .fullscreen_button`);

//	Subscribe function to text area on edit
editor.on('change keyup paste', handle_essay_text_change);
fullscreen_editor.on('change keyup paste', handle_fullscreen_essay_text_change);

//	Subscribe function to full screen button
fullscreen_button.on('click', () => show_modal({ type: `fullscreen editor confirm`, title: 'Fullscreen Editor' }, handle_editor_expand, handle_editor_collapse));

//	Function called when essay is being edited
function handle_essay_text_change () {

	//	Get a match of all non whitespace words
	var matches = editor.val().match(/\S+/g)
	
	//	Calculate number of words
	var num_words = matches ? matches.length : 0;

	//	Update word count
	word_count.html(`${num_words} words`);

}

//	Function called when essay is being edited
function handle_fullscreen_essay_text_change () {

	//	Get a match of all non whitespace words
	var matches = fullscreen_editor.val().match(/\S+/g)
	
	//	Calculate number of words
	var num_words = matches ? matches.length : 0;

	//	Update word count
	fullscreen_word_count.html(`${num_words} words`);

}

//	Function called when the user expands the editor
function handle_editor_expand () {

	//	Set fullscreen editor text
	fullscreen_editor.val(editor.val());
	handle_fullscreen_essay_text_change();

}

//	Function called when the user collapses the editor
function handle_editor_collapse () {

	//	Set editor text
	editor.val(fullscreen_editor.val());
	handle_essay_text_change();

}