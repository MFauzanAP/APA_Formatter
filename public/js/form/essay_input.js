//	Get reference to essay editor toolbar elements
const editor = $(`.essay_form .essay textarea`);
const word_count = $(`.essay_form .essay .word_count`);

//	Subscribe function to text area on edit
editor.on('change keyup paste', handle_essay_text_change);

//	Function called when essay is being edited
function handle_essay_text_change () {

	//	Get the number of words
	var num_words = editor.val().match(/\S+/g).length;

	//	Update word count
	word_count.html(`${num_words} words`);

}