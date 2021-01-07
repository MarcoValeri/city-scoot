function initMap() {

    // Set user's location
	if (!navigator.geolocation) {
		alert("Geolocation is not supported by your browser");
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
    }
    
    function success(position) {

		const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: {lat: userLat, lng: userLng},
            mapTypeId: "terrain",
        });

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

}