window.onload = getFavoriteRoutes;

let xhr = false;

// Test 
const removeBtn = document.getElementById("test-btn");

// Declare a function that gets the data through the data/routes.json file
function getFavoriteRoutes() {

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
        xhr.onreadystatechange = displayFavoriteRoutes;
    } else {
        document.getElementById("routes-msg").innerHTML = "Error. Could not perform the stated request";
    }

}

// Declare a function that display the data/routes.json data into route.html
function displayFavoriteRoutes() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText); 
			let dataText = "";
            const favorites = getLocalStorage();

            for (let x = 0; x < favorites.length; x++) {
                for (let i in data.routes) {
                    if (parseInt(favorites[x]) === parseInt(data.routes[i].routeID)) {
                        dataText+= `<tr scope='row'><td>
                        ${data.routes[i].name}</td><td>
                        ${data.routes[i].day}</td><td>
                        ${data.routes[i].time}</td><td>
                        ${data.routes[i].highlights}</td><td>
                        <img class="img-fluid" src="../images/${data.routes[i].image}"</td><td>
                        ${data.routes[i].startLat}</td><td>
                        ${data.routes[i].endLat}</td><td>
                        ${data.routes[i].startLng}</td><td>
                        ${data.routes[i].endLng}</td><td>
                        <button id='${data.routes[i].routeID}'><i class='far fa-trash-alt'></i></button>
                        </td>
                        `;

                        // Event that removes all favorites
                        removeBtn.addEventListener("click", () => {
                            localStorage.removeItem("routes", 'Soho');
                            console.log(`Deleted`);
                        });
                    }
                }
            }
            document.getElementById("routes-data-output").innerHTML = dataText;
        } else {
            document.getElementById("routes-msg").innerHTML = "Error. Could not perform the stated request Error: " + xhr.status;
        }
    }

}


function getLocalStorage() {
    let guideFavorites = JSON.parse(window.localStorage.getItem("routes"));
    return guideFavorites;
}