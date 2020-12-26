window.onload = getRoutes;

let xhr = false;

// Declare a function that gets the data through the data/routes.json file
function getRoutes() {

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
        xhr.onreadystatechange = displayRoutes;
    } else {
        document.getElementById("routes-msg").innerHTML = "Error. Could not get the request";
    }

}

// Declare a function that display the data/routes.json data into routes.html and route.html
function displayRoutes() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            let dataText = "";
            const url = $(location).attr("search"); 
            const params = new URLSearchParams(url);
            console.log(params);

            for (let i in data.routes) {

                dataText += "<tr scope='row'><td><strong>" + 
                data.routes[i].name + "</strong></td><td>" +
                data.routes[i].day + "</td><td>" +
                data.routes[i].time + "</td><td>" +
                data.routes[i].highlights + "</td><td>" +
                "<a href='route.html?routeID=" + data.routes[i].routeID + "' class='btn btn-sm btn-primary'>Details</a>" + 
                "</td></tr>";

            }

            if (dataText.length < 1) {
                document.getElementById("routes-msg").style.display = "none";
                document.getElementById("routes-msg").style.display = "block";
                document.getElementById("routes-msg").innerHTML = "No Routes";
            }

            document.getElementById("routes-data-output").innerHTML = dataText;

        } else {
            document.getElementById("routes-msg").innerHTML = "Error. Could not get the request" + xhr.status;
        }
    }

}