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

		<td><input type="text" id="student_name" name="student_name" placeholder="Student Name" required/></td>

		<td><input type="text" id="student_id" name="student_id" placeholder="Student ID" required/></td>

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

	//	Change essay saved state
	essay.saved = false;

	//	Update save status
	$(`.save_status`).addClass('active');

}

//	Function called to set the table entries
function set_table_entries (data) {

	//	Remove all entries
	$(`tbody`, table_input).html('');

	//	Reset number of entries
	num_entries = 0;

	//	For each piece of data
	data.forEach(val => {

		//	If there are no more than 10 spaced
		if (num_entries < 10) {

			//	Declare row element html
			var html = `
				<tr>
					<td><i class="fa fa-bars grip"></i></td>
					<td><input type="text" id="student_name" name="student_name" placeholder="Student Name" value="${val.name}" required/></td>
					<td><input type="text" id="student_id" name="student_id" placeholder="Student ID" value="${val.id}" required/></td>
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

	})

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

	//	Change essay saved state
	essay.saved = false;

	//	Update save status
	$(`.save_status`).addClass('active');

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

//	Function called to get the table data
function get_table_data () {

	//	Prepare output
	var output = [];

	//	Get rows from table
	var rows = $(`tbody tr`, table_input);

	//	Loop through each row and extract data
	rows.each((index, row) => {

		//	Add data to output array
		output.push({name: $(`input#student_name`, row).val(), id: $(`input#student_id`, row).val()});

	})

	//	Return output
	return output;

}