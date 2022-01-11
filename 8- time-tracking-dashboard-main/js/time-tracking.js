let period = 'daily';
let cardsExist = 0;

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

// Sets previous timeframe language into an array
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
    cardsExist = cardsExist + 1;
    for (let i = 0; i < data.length; i++) {
        let card = data[i];
        let title = card.title;
        let times = getTimes(card, period);
        if (cardsExist > 1) {
            let e2 = document.querySelectorAll('.current');
            let e3 = document.querySelectorAll('.previous-timeframe');
            let e4 = document.querySelectorAll('.previous-hours');
            e2[i].innerText = times.current + 'hrs';
            e3[i].innerText = times.previousTimeframe;
            e4[i].innerText = times.previous + 'hrs';
        }
        else if (cardsExist == 1) {
            console.log('inserting elements');
            let element =
                `
            <div class="card ${(card.title.toLowerCase()).replace(/\s/g, "-")}"> 
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
}

// Sets click event listeners on our nav buttons, and executes function to populate elements with appropriate time period
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