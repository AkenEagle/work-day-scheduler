const writeTodaysDate = function () {
    // Get today's date
    const today = moment().format(`dddd Do MMMM, YYYY`)

    // Set text
    $(`#currentDay`).text(today);
}

const writeCurrentTime = function () {
    const currentTime = moment().format(`H:mm:ss`);

    $(`#clock`).text(currentTime);
}

const buildTimeBlocks = function () {
    // Create time blocks from hour 9 to 17
    const times = [`9AM`, `10AM`, `11AM`, `12PM`, `1PM`, `2PM`, `3PM`, `4PM`, `5PM`];

    // Get current hour (to then set the rows' colors)
    const currentHour = moment().format(`H`);

    // Build the rows
    for(let i=0; i<times.length; i++) {
        // Create elements
        const divTimeBlock = $(`<div class="row"></div>`);
        const divTBTime = $(`<div class="hour">${times[i]}</div>`);
        const divTBTextArea = $(`<textarea data-time="${i+9}"></textarea>`);

        // Set color for the text area
        if ((i+9) == currentHour) {
            divTBTextArea.addClass(`present`); 
        } else if ((i+9) < currentHour) {
            divTBTextArea.addClass(`past`);
        } else {
            divTBTextArea.addClass(`future`);
        }

        // Save button
        const divSaveBTN = $(`<div class="saveBtn" data-time="${i+9}"><i class="fas fa-save"></i></div>`);

        // Append the elements
        divTimeBlock.append(divTBTime);
        divTimeBlock.append(divTBTextArea);
        divTimeBlock.append(divSaveBTN);
        $(`.container`).append(divTimeBlock);
    }
}

const saveToLS = function (event) {
    // Get from the page
    const hour = $(event.target).attr("data-time");
    const text = $(`textarea[data-time='${hour}']`).val();

    if (text.length) {
        // Set in LS
        localStorage.setItem(hour, text)
    } else {
        localStorage.removeItem(hour);
    }
}

const loadFromLS = function () {
    let displayAlert;

    if(localStorage.length > 0) {
        for(let i=9; i<=17; i++) {
            const lsText = localStorage.getItem(i);
            if (lsText) {
                const textArea = $(`textarea[data-time='${i}']`);
                $(textArea).text(lsText);
            }   
        }

        displayAlert = $(`<div class="alert alert-success">Data loaded from previous session.</div>`)
    } else {
        displayAlert = $(`<div class="alert alert-info">You can write your tasks and save them using the Save button icon on the right.</div>`)
    }

    $('header').append(displayAlert);

    const destroyDisplayAlert = function () {
        displayAlert.remove()
    }

    setTimeout(destroyDisplayAlert, 3000);
}

const buildEverything = function () {
    // Set today's date in the text
    writeTodaysDate();
    
    // Set current time
    writeCurrentTime();
    // Update every second
    setInterval(writeCurrentTime, 1000);

    // Build the rows
    buildTimeBlocks();

    // Load from LS
    loadFromLS();

    // Add event listener
    $(".saveBtn").click(saveToLS);
}

// Build time blocks on load page
$(document).on("load", buildEverything());