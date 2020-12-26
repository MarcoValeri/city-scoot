window.onload = getRouteDetails;

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
                    "<img src='../images/" + data.routes[i].image +"'></td><td>" +
                    data.routes[i].startLat + "</td><td>" +
                    data.routes[i].startLng + "</td><td>" +
                    data.routes[i].endLat + "</td><td>" +
                    data.routes[i].endLng + "</td>";
                }

            }
            document.getElementById("routes-data-output").innerHTML = dataText;
        } else {
            document.getElementById("statusmessage").innerHTML = "Error. Could not perform the stated request Error: " + xhr.status;
        }

    }

}