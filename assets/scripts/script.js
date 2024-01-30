// This is a call to JQuery to ensure that the code isn't run until the browser has 
// finished rendering all the elements in the html.
$(function () {
    // Get the date from today using dayjs
    var today = dayjs();

    // Set the date to the element with id #currentDay using dayjs with the format specified
    $("#currentDay").text(today.format('dddd, MMMM DD'));

    // This function validate times (past,present, future)
    function validateRowTime(){
        // Get the current hour, example: 6,7,8,9
        var currentHour = today.format('H');
        // Get the current format example: AM  --   PM  in capital letters
        var currentAMPM = today.format('A');

        // Get the element with the class hourRow (div)
        var hourRowEl = $('.hourRow');
        
        // Loop through the elements with the class hourRow
        hourRowEl.each(function() {
            // "this" refers to the current element in the loop in this case the div
            // Get the text of the div
            var fullText = $(this).text();
            // Get the text without the last two characters (AM or PM), example: 6,7,8,9
            var textWithoutLastTwo = fullText.slice(0,-2);
            // Get the last two characters (AM or PM)
            var lastTwoCha = fullText.slice(-2);

            // Find the closest parent with class 'row'
            var row = $(this).closest('.row'); 
            // Remove all classes first
            row.removeClass('past future present');
            
            // Convert the text to integer in this case the hour
            var rowHour24 = parseInt(textWithoutLastTwo);

            // Convert hours PM to 24 hours format adding 12, example: 6PM = 18, 7PM = 19
            if (lastTwoCha === 'PM' && rowHour24 !== 12) {
                rowHour24 += 12;
            }
            // Clasified the row with the correct class (past, present, future)
            if ((rowHour24 < parseInt(currentHour))) {
                row.addClass('past');
            } else if(rowHour24 > parseInt(currentHour)){
                row.addClass('future'); 
            } else if (rowHour24 === parseInt(currentHour) && currentAMPM === lastTwoCha) {
                row.addClass('present');
            }
            
        })
    }
    // Call the function to validate the time
    validateRowTime();

    // Capture the button with the class saveBtn
    var buttonSaveEl = $('.saveBtn');
    // Add an event listener to the button that was stored in the variable buttonSaveEl
    buttonSaveEl.on('click', function(){
        // Get the id attribute of the parent element of the button
        var id = $(this).parent().attr('id');
        // Get the value of the textarea which is one of the siblings of the button
        var text = $(this).siblings('textarea').val();
        // Save the value of the id and the textarea in the local storage
        localStorage.setItem(id, text);
        
        // Retrieve the "events" array from local storage. If it doesn't exist, 
        // default to an empty array.
        var events = JSON.parse(localStorage.getItem("events")) || [];
        // Push the new event to the array setting the time and the type of event
        events.push({time: id, type: text});
        // Convert the "events" array to a string and save it back to local storage
        localStorage.setItem("events", JSON.stringify(events));
        // Alert the user that the event has been saved successfully, using SweetAlert2
        Swal.fire({
            title: "Event saved!",
            text: "Your event has been successfully saved!",
            icon: "success"
        });
    })
    
    // Call the function
    renderEventsCalendar();

    // Function to render the events saved in the local storage
    function renderEventsCalendar() {
        // Retrieve the "events" array from local storage. If it doesn't exist,
        // default to an empty array.
        var events = JSON.parse(localStorage.getItem("events")) || [];
        
        // Loop through the events array
        for (var i = 0; i < events.length; i++) {
            // Get the time and the text of the event
            var eventHour = events[i].time;
            var eventText = events[i].type;

            // Declare 9 variables for capturing the 9 divs:
            var div1 = $('#hour-9');
            var div2 = $('#hour-10');
            var div3 = $('#hour-11');
            var div4 = $('#hour-12');
            var div5 = $('#hour-13');
            var div6 = $('#hour-14');
            var div7 = $('#hour-15');
            var div8 = $('#hour-16');
            var div9 = $('#hour-17');

            // Compare the eventHour with the divs id and set the text to the textarea
            // Class textAreaStyle is for styling
            switch(eventHour) {
                case 'hour-9':
                    var text = div1.children('textarea');
                    text.addClass('textAreaStyle');
                    text.text(eventText);
                    break;
                case 'hour-10':
                    var text = div2.children('textarea');
                    text.addClass('textAreaStyle');
                    text.text(eventText);
                    break;
                case 'hour-11':
                    var text = div3.children('textarea');
                    text.addClass('textAreaStyle');
                    text.text(eventText);
                    break;
                case 'hour-12':
                    var text = div4.children('textarea');
                    text.addClass('textAreaStyle');
                    text.text(eventText);
                    break;
                case 'hour-13':
                    var text = div5.children('textarea');
                    text.addClass('textAreaStyle');
                    text.text(eventText);
                    break;
                case 'hour-14':
                    var text = div6.children('textarea');
                    text.addClass('textAreaStyle');
                    text.text(eventText);
                    break;
                case 'hour-15':
                    var text = div7.children('textarea');
                    text.addClass('textAreaStyle');
                    text.text(eventText);
                    break;
                case 'hour-16':
                    var text = div8.children('textarea');
                    text.addClass('textAreaStyle');
                    text.text(eventText);
                    break;
                case 'hour-17':
                    var text = div9.children('textarea');
                    text.addClass('textAreaStyle');
                    text.text(eventText);
                    break;
            }

        }
    }
  });

  // End of the script