// Fetch tracking data
const data = function () {
    const trackingData = fetch('data.json')
        .then(data => {
            return data.json();
        })
        .catch(err => {
            console.log('Could not fetch data!');
        });
    return trackingData;
};

// Apply click events to nav buttons
(function () {
    let button = document.querySelectorAll('.time-selection');
    button.forEach(element => {
        let time = element.getAttribute('name');
        element.addEventListener('click', populateElements(time));
    });
});

// Gets entries for specific timeframe
async function getTimeframes(timeframe) {


    let t = timeframe;
    console.log('Getting values for ' + t);
    for (let i = 0; i < data.length; i++) {
        let arr = [];
        arr.push(data[i].timeframes.t);
        console.log(data[i].timeframes.t);
    };
};


async function populateElements() {
    const arr = data;
    let t = '';
    let container = document.querySelector('#grid');

    for (let i = 0; i < arr.length; i++) {
        let card = arr[i];
        let element =
            `
            <div class="card ${(card.title.toLowerCase()).replace(/\s/g, "-")}"> 
            <div class="decoration"></div> 
            <div class="content"> 
            <div class="title">${card.title}
            <img src="images/icon-ellipsis.svg" width="20" height="auto" alt=""> 
            </div> 
            <div class="current"></div> 
            <div class="previous"><span class="previous-timeframe"></span><span class="previous-hours"></span></div> 
            </div> 
            </div>
            `;
        container.innerHTML += element;
    }
};

async function populateData(arr) {
    await populateElements(function () {
        for (let i = 0; i < array.length; i++) {

        }
    });
};

populateElements(getTimeframes('daily'));