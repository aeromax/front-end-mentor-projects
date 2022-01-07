let period = '';
// Store tracking data locally
function getData() {
    return fetch('data.json')
        .then(data => {
            console.log('getData');
            return data.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(`Error fetching data: ${error} background-color:white;color:red`);
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

// Adds a card for each data entry
async function populateElements(period) {
    console.log('populateElements');
    // let data = await getData();
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

document.addEventListener('DOMContentLoaded', function () {
    populateElements('daily');
    let buttons = document.querySelectorAll('.time-selection');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            period = button.getAttribute('data-flag');
            console.log(period);
            populateElements(period);
        })
    })
})