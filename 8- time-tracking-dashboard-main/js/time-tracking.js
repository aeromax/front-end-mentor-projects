// Default setting for which period we will show when page loads
let period = 'daily';

// Store tracking data locally
function getData() {
    return fetch('data.json')
        .then(data => {
            console.log('getData');
            return data.json();
        })
        .then(data => {
            populateElements(data, period);
        })
        .catch(error => {
            console.log(`Error fetching data: ${error}`);
        });
}



function getTimes(card, period) {
    let arr = [];
    if (period == 'daily') {
        arr.push(card.timeframes.daily);
        arr[0].previousTimeframe = 'Yesterday';
    }
    else if (period == 'weekly') {
        arr.push(card.timeframes.weekly);
        arr[0].previousTimeframe = 'Last Week';
    }
    if (period == 'monthly') {
        arr.push(card.timeframes.monthly);
        arr[0].previousTimeframe = 'Last Month';
    }
    return arr[0];
}

//Updates data variables in html
function populateData(period) {
    console.log('populateData ' + period);
}
// Adds a card for each data entry
function populateElements(data) {
    let container = document.querySelector('#grid');
    for (let i = 0; i < data.length; i++) {
        let card = data[i];
        let title = card.title;
        let times = getTimes(card, period);
        let element =
            `
            <div class="card ${(card.title.toLowerCase()).replace(/\s/g, "-")}"> 
            <div class="decoration"></div> 
            <div class="content"> 
            <div class="title">${(title)}
            <img src="images/icon-ellipsis.svg" width="20" height="auto" alt=""> 
            </div> 
            <div class="current">${(times.current)}hrs</div> 
            <div class="previous">
            <span class="previous-timeframe">${(times.previousTimeframe)}</span> - <span class="previous-hours">${(times.previous)}hrs</span></div> 
            </div> 
            </div>
            `;
        container.innerHTML += element;
    }
}
// Apply click events to nav buttons
(function (period) {
    let buttons = document.querySelectorAll('.time-selection');

    for (let i = 0; i < buttons.length; i++) {
        console.log(buttons[i]);
        buttons[i].addEventListener('click', function () {
            console.log('click');
        });
    }

})();


getData();