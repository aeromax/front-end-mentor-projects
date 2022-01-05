

function getTrackingData() {
    const trackingData = fetch('data.json')
        .then(data => {
            return data.json();
        })
        .catch(err => {
            console.log('Could not fetch data!');
        });
    return trackingData;
};
async function populateElements() {
    const arr = await getTrackingData();
    console.log(await getTrackingData());
    let t = '';
    let container = document.querySelector('#grid');

    for (let i = 0; i < arr.length; i++) {
        let element =
            `
            < div class="card ${arr[i].title}"> 
            <div class="decoration"></div> 
            <div class="content"> 
            <div class="title">Work 
            <img src="images/icon-ellipsis.svg" width="20" height="auto" alt=""> 
            </div> 
            <div class="current"></div> 
            <div class="previous"><span class="previous-timeframe"></span><span class="previous-hours"></span></div> 
            </div> 
            </div>
            `;
        t = arr[i].title;
        console.log(container);
        container.innerHTML = element;
    }
    return arr;
};

async function populateData(arr) {
    await populateElements(function () {
        for (let i = 0; i < array.length; i++) {

        }
    });
};
populateElements();
