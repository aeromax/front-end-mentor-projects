let period = 'daily';
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
    let data = await getData();
    let container = document.querySelector('.grid');
    for (let i = 0; i < data.length; i++) {
        let card = data[i];
        let title = card.title;
        let times = getTimes(card, period);

        let element =
            `
            <div class="card ${(card.title.toLowerCase()).replace(/\s/g, "-")}" remove> 
            <div class="decoration"></div> 
            <div class="deco-radius"></div>
            <div class="content"> 
            <div class="title">${(title)}
            <span class="ellipsis"></span>
            </div> 
            <div class="times">
            <div class="current">${(times.current)}hrs</div> 
            <div class="previous">
            <span class="previous-timeframe">${(times.previousTimeframe)}</span> - <span class="previous-hours">${(times.previous)}hrs</span></div> 
            </div> 
            </div>
            </div>
            `;
        container.insertAdjacentHTML('beforeend', element);


    }
}

document.addEventListener('DOMContentLoaded', function () {
    populateElements(period)
    let buttons = document.querySelectorAll('.time-selection');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            period = buttons[i].getAttribute('data-flag');
            populateElements(period);
        })

    }

})