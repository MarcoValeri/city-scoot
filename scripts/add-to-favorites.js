// Create a variable that holds favorites button in HTML
let addToFavsBtn = document.getElementById("addtofavorites");

// Define event
addToFavsBtn.onclick = function() {
    const url = $(location).attr("search");
    const params = new URLSearchParams(url);
    const routeID = params.get("routeID");
    let routes;

    if (localStorage.getItem("routes") === null) {
        routes = [];
    } else {
        routes = JSON.parse(localStorage.getItem("routes"));
    }

    routes.push(routeID);
    console.log(routes);
    localStorage.setItem('routes', JSON.stringify(routes));
};