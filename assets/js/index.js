const buildTimeBlocks = function () {
    // Create time blocks from hour 9 to 17
    const times = [`9AM`, `10AM`, `11AM`, `12PM`, `1PM`, `2PM`, `3PM`, `4PM`, `5PM`];

    for(let i=0; i<times.length; i++) {
        const divTimeBlock = $(`<div class="jumbotron"></div>`);
        const divTBTime = $(`<div class="timeblock-time">${times[i]}</div>`);
        const divTBTextArea = $(`<textarea class="timeblock-textarea"></textarea>`);
        const divSaveBTN = $(`<div class="saveBtn"><i class="fas fa-save"></i></div>`);

        divTimeBlock.append(divTBTime);
        divTimeBlock.append(divTBTextArea);
        divTimeBlock.append(divSaveBTN);
        $(`.container`).append(divTimeBlock);
    }
}

// Build time blocks on load page
$(document).on("load", buildTimeBlocks());