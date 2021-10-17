//	Get reference to table input elements
const table_input = $(`.essay_form .authors .table_input`);

//	Subscribe functions to table input elements
$(`.add`, table_input).on('click', handle_add_table_entry);
$(`.delete`, table_input).on('click', handle_add_table_entry);

//	Function called when add entry is clicked
function handle_add_table_entry () {

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

}