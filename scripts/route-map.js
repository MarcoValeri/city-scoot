function initMap() {

    const routeMap = {
        lat: 44.419675,
        lng: -110.584707
    };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8, 
		center: routeMap,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_CENTER
		},
		scaleControl: true,
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		},
		fullscreenControl: false
    });

    const marker = new google.maps.Marker({position: routeMap, map: map});

}