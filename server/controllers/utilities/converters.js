'use strict';

//	Function called to convert from date picker date to normal date
function convert_picker_to_date (date) {

	//	Declare month conversion array
	var months = {
		'01'		: 'January',
		'02'		: 'February',
		'03'		: 'March',
		'04'		: 'April',
		'05'		: 'May',
		'06'		: 'June',
		'07'		: 'July',
		'08'		: 'August',
		'09'		: 'September',
		'10'		: 'October',
		'11'		: 'November',
		'12'		: 'December'
	};

	//	Split date by -
	var split = date.split('-');

	//	Get date month and year from date
	var year = split[0];
	var month = months[split[1]];
	var day = split[2];

	//	Return converted date
	return `${day} ${month} ${year}`;

}

//	Export function
module.exports = {
	convert_picker_to_date
}