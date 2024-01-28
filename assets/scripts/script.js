// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var today = dayjs();
console.log(today);

$("#currentDay").text(today.format('dddd, MMMM DD'));

// Validate times
function validateRowTime(){
    var currentHour = today.format('H');
    var currentAMPM = today.format('A');
    console.log(currentHour);
    console.log(currentAMPM);

    var hourRowEl = $('.hourRow');
    console.log(hourRowEl);
    

    hourRowEl.each(function() {
        var fullText = $(this).text();
        console.log(fullText);
        var textWithoutLasTwo = fullText.slice(0,-2);
        console.log(textWithoutLasTwo);
        console.log(typeof(textWithoutLasTwo));
        var lastTwoCha = fullText.slice(-2);
        console.log(lastTwoCha); //AM or PM


        var row = $(this).closest('.row'); // Find the closest parent with class 'row'

        // Remove all classes first
        row.removeClass('past future present');
        
        
    
        var rowHour24 = parseInt(textWithoutLasTwo);

        // Convertir horas PM a formato de 24 horas sumando 12
        if (lastTwoCha === 'PM' && rowHour24 !== 12) {
            rowHour24 += 12;
        }
        /* if(parseInt(textWithoutLasTwo) < parseInt(currentHour) && currentAMPM == lastTwoCha) {
            row.addClass('past');
        } else if(parseInt(textWithoutLasTwo) > parseInt(currentHour) && currentAMPM == lastTwoCha) {
            row.addClass('future');
        } else {
            row.addClass('present');
        } */
        if ((rowHour24 < parseInt(currentHour))) {
            row.addClass('past');
        } else if(rowHour24 > parseInt(currentHour)){
            row.addClass('future'); 
        } else if (rowHour24 === parseInt(currentHour) && currentAMPM === lastTwoCha) {
            row.addClass('present');
        }
        
    })
}

validateRowTime();

// Create the event for the button
$('.saveBtn').on('click', function() {
    var id = $(this).parent().attr('id');
    var text = $(this).siblings('textarea').val();
    localStorage.setItem(id, text);
});
 // Reload and still the information is saved.
var events = JSON.parse(localStorage.getItem(id, text));

$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  });