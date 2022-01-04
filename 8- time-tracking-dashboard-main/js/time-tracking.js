function getTrackingData() {
    var trackingData = fetch('data.json')
        .then(data => {
            return data.json();
        })
        .then(data => {
            // console.log(data);
        })
        .catch(err => {
            console.log('Could not fetch data!');
        });

};

function appendData() {
    var data = getTrackingData(data);
    const cards = document.querySelectorAll('.card');
    for (i = 1; i < cards.length; i++) {
        var title = cards[i].getAttribute('data-flag');
        console.log(data[]);
    }
};

appendData();