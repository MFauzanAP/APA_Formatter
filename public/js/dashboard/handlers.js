//	Function called to check if current submission is eligible for download
function handle_submmission (submission) {

	//	Loop through each row and check for empty fields
	for (let index = 0; index < submission.details.students.length; index++) {

		//	Get row
		const row = submission.details.students[index];

		//	If name or id is empty then return false
		if (row.name == '') return false;
		
		//	If name or id is empty then return false
		if (row.id == '') return false;

	}

	//	Make sure data is not empty
	if (!submission.details.title) return false;
	if (!(submission.essay.replaceAll(' ', '').replaceAll('\n', ''))) return false;

	//	Return true if no other errors were encountered
	return true;

}