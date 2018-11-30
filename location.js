// getting basic user info
function getUserInfo() {
	var geocoder = new google.maps.Geocoder;
	var pos;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
	geocoder.geocode({'location': pos}, function(results, status) {
		if (status === 'OK') {
      if (results[0]) {
				document.getElementById('loca').innerHTML = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}