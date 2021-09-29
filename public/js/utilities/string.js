//      Capitalise each word in a string
function capitalise_string (str) {

        //      Split the string by spaces
        var split = str.split(' ');

        //      Loop through each word
        var words = split.map((word) => {

                //      Capitalise first letter
                return word.charAt(0).toUpperCase() + word.substring(1);

        })

        //      Return capitalised string
        return words.join(' ');

}