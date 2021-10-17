//	Get reference to table input elements
const table_input = $(`.essay_form .authors .table_input`);

//	Subscribe functions to table input elements
$(`.add`, table_input).on('click', handle_add_table_entry);
$(`.delete`, table_input).on('click', handle_remove_table_entry);
$(`.size input`, table_input).on('change', handle_update_table_size);

//	Variable used to hold number of entries
var num_entries = 1

//	Function called when add entry is clicked
function handle_add_table_entry () {

	//	If there are no more spaces then exit
	if (num_entries >= 10) return;

	//	Declare row element html
	var html = `
	<tr>

		<td><i class="fa fa-bars grip"></i></td>

		<td><input type="text" id="student_name" name="student_name" required=""></td>

		<td><input type="text" id="student_id" name="student_id" required=""></td>

		<td><button class="delete"><i class="fa fa-times"></i></button></td>

	</tr>`;

	//	Add new row
	$(`tbody`, table_input).append(html);

	//	Subscribe function to delete button
	$(`.delete`, table_input).off('click');
	$(`.delete`, table_input).on('click', handle_remove_table_entry);

	//	Increment num entries
	num_entries++;

	//	Update size input
	$(`.size input`, table_input).val(num_entries);

}

//	Function called when the remove entry button is clicked
function handle_remove_table_entry (i = 0) {

	//	If thereis only one entry then exit
	if (num_entries <= 0) return;

	//	Get index
	var index = $(`.delete`, table_input).index(this);
	index = index >= 0 ? index : i;

	//	Delete element at this index
	$(`tbody tr:nth-child(${index + 1})`, table_input).remove();

	//	Decrement num entries
	num_entries--;

	//	Update size input
	$(`.size input`, table_input).val(num_entries);

}

//	Function called when the size changes
function handle_update_table_size () {

	//	Get current value
	var value = Math.max(0, Math.min(10, this.value));

	//	Loop until num entries is equal to the value
	while (num_entries != value) {

		//	Get difference
		var diff = value - num_entries;

		//	Add or delete based on difference
		diff > 0 ? handle_add_table_entry() : handle_remove_table_entry(num_entries - 1);

	}

}