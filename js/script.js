$.getJSON('https://ipinfo.io', function (data) {
    sendIp(data);
});

function sendIp(datajson) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://whoami-65bb.restdb.io/rest/ip-info",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "02cfc574ed5f7a7768ee123e8b5aa09ec3166",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(datajson)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}