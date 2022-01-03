function getTrackingData() {
    const trackingData = fetch('data.json')
        .then(data => { return data.JSON() })
        .then(data => console.log(data));
    // return trackingData;
};