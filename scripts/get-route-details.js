window.onload = getRouteDetails;

/*
    Create a initMap() that sets up the map
    The function has four parametes:
        1 - startLat: start latitude
        2 - startLng: start longitude
        3 - endLat: end latitude
        4 - endLng: end longitude
    return: the functions returns the map with the start and end point indicate by its parametes
*/
function initMap(startLat, startLng, endLat, endLng) {

    // Set area map
    const routeMap = {
        lat: 51.54695986127388,
        lng: -0.1374362038401223
    };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11, 
        center: routeMap
    });

    // Set user's position
    if (!navigator.geolocation) {
		alert("Geolocation is not supported by your browser");
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const usermarkerPos = new google.maps.LatLng(userLat, userLng);
        const userMarker = new google.maps.Marker({
            position: usermarkerPos,
            map: map,
            title: "You are here"
        });
        userMarker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue.png");
    }

    function error() {
        alert("Unable to retrive your location");
    }

    // Set start point on the map
    const routeStart = [
		{"stationName": "Start", "coords": {"lat": startLat, "lng": startLng}}
    ];

    for (let i = 0; i < routeStart.length; i++) {

        const markerPos = new google.maps.LatLng(routeStart[i].coords.lat, routeStart[i].coords.lng);
        const marker = new google.maps.Marker({
            position: markerPos,
            map: map,
            title: "Start point"
        });
        marker.setIcon("https://maps.google.com/mapfiles/ms/icons/cycling.png");
    }

    // Set end point on the map
    const routeEnd = [
        {"stationName": "End", "coords":  {"lat": endLat, "lng": endLng}}
    ];
    
    for (let i = 0; i < routeEnd.length; i++) {

        const markerPos = new google.maps.LatLng(routeEnd[i].coords.lat, routeEnd[i].coords.lng);
        const marker = new google.maps.Marker({
            position: markerPos,
            map: map,
            title: "Start point"
        });
        marker.setIcon("https://maps.google.com/mapfiles/ms/icons/green.png");

    }
    
}

let xhr = false;

// Declare a function that gets the data through the data/routes.json file
function getRouteDetails() {

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {
            xhr = newActiveXObject("Microsoft.XMLHTTP");
        }
    }

    if (xhr) {
        xhr.open("GET", "../data/routes.json", true);
        xhr.send();
        xhr.onreadystatechange = displayRouteDetails;
    } else {
        document.getElementById("routes-msg").innerHTML = "Error. Could not perform the stated request";
    }

}

// Declare a function that display the data/routes.json data into routes.html and route.html
function displayRouteDetails() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            let dataText = "";
            const url = $(location).attr("search");
            const params = new URLSearchParams(url);

            for (let i in data.routes) {

                if (data.routes[i].routeID === params.get("routeID")) {
                    dataText += "<tr scope='row'><td class='text-left'><strong>" + 
                    data.routes[i].name + "</strong></td><td>" +
                    data.routes[i].day + "</td><td>" +
                    data.routes[i].time + "</td><td>" +
                    data.routes[i].highlights + "</td><td>" +
                    "<img class='img-fluid' src='../images/" + data.routes[i].image +"'></td><td id='start-lat'>" +
                    data.routes[i].startLat + "</td><td>" +
                    data.routes[i].startLng + "</td><td>" +
                    data.routes[i].endLat + "</td><td>" +
                    data.routes[i].endLng + "</td>";

                    // Call function that set the map
                    initMap(data.routes[i].startLat, data.routes[i].startLng, data.routes[i].endLat, data.routes[i].endLng);
                };
                

            }
            document.getElementById("routes-data-output").innerHTML = dataText;
        } else {
            document.getElementById("statusmessage").innerHTML = "Error. Could not perform the stated request Error: " + xhr.status;
        }

    }

}