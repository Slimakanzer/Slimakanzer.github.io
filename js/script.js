var corsApiKey = "5e9c2029436377171a0c259f";

$.getJSON('https://ipinfo.io', function (data) {
    sendIp(data);
});

function sendIp(datajson) {
    var jsondata = {"ip": datajson};
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://whoami-65bb.restdb.io/rest/ip-info",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-apikey": corsApiKey,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
}