
// Store tracking data locally
let trackingData = getData();
async function getData() {
    let response =
        await fetch('data.json')
            .then(data => {
                console.log('getData');
                return data.json();
            })
            .catch(error => {
                console.log('Could not fetch data!');
            });
    let data = await response.data;
    populateElements();

}

// Default setting for which period we will show when page loads
let period = 'day';

// Apply click events to nav buttons
(function () {
    let button = document.querySelectorAll('.time-selection');
    button.forEach(element => {
        let time = element.getAttribute('name');
        element.addEventListener('click', populateElements(time));
    })
})

//Gets entries for specific timeframe
function getTimeframes(period) {
    console.log('getTimeFrames ' + period);
    for (let i = 0; i < trackingData.length; i++) {
        let arr = [];
        arr.push(trackingData[i].timeframes.period);
        console.log(trackingData[i].timeframes.period);
    }
}

function populateElements(data) {

    console.log('populateElements ' + period);
    getTimeframes(period);
    let t = '';
    let container = document.querySelector('#grid');
    console.log('creating ' + trackingData.length + ' cards');
    for (let i = 0; i < trackingData.length; i++) {
        let card = trackingData[i];
        let element =
            `
            <div class="card ${(card.title.toLowerCase()).replace(/\s/g, "-")}"> 
            <div class="decoration"></div> 
            <div class="content"> 
            <div class="title">${card.title}
            <img src="images/icon-ellipsis.svg" width="20" height="auto" alt=""> 
            </div> 
            <div class="current">${card.timeframes.period.current}</div> 
            <div class="previous"><span class="previous-timeframe"></span><span class="previous-hours"></span></div> 
            </div> 
            </div>
            `;
        container.innerHTML += element;
    }
}

(function () {
    if (trackingData.length == 0) {
        console.log('no data!');
    }
    else {
        console.log('got data!');
    }
})