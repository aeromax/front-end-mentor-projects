
// Store tracking data locally
const trackingData =
    fetch('data.json')
        .then(data => {
            return data.json();
        })
        .catch(err => {
            console.log('Could not fetch data!');
        });

// Apply click events to nav buttons
(function () {
    let button = document.querySelectorAll('.time-selection');
    button.forEach(element => {
        let time = element.getAttribute('name');
        element.addEventListener('click', populateElements(time));
    });
});

//Gets entries for specific timeframe
function getTimeframes(period) {
    console.log('getTimeFrames');
    console.log('Getting values for ' + period);
    for (let i = 0; i < trackingData.length; i++) {
        let arr = [];
        arr.push(trackingData[i].timeframes.period);
        console.log(trackingData[i].timeframes.period);
    };
};

function populateElements() {
    console.log('populating elements!');
    getTimeframes(daily);
    let t = '';
    let container = document.querySelector('#grid');

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
};

(function () {
    if (trackingData.length == 0) {
        console.log('no data!');
    }
    else {
        console.log('got data!');
    }
});