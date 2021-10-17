const writeTodaysDate = function () {
    // Get today's date
    const today = moment().format(`dddd Do MMMM, YYYY`)

    // Set text
    $(`#currentDay`).text(today);
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
    console.log($(event.target).attr("data-time"))
}

const buildEverything = function () {
    // Set today's date in the text
    writeTodaysDate();

    // Build the rows
    buildTimeBlocks();

    // Add event listener
    $(".saveBtn").click(saveToLS);
}

// Build time blocks on load page
$(document).on("load", buildEverything());