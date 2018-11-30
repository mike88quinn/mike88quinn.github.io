var customLabel = {
	restaurant: {
		label: 'R'
	},
	bar: {
		label: 'B'
	}
};
var geocoder;
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 12,
  });
  var infoWindow = new google.maps.InfoWindow;

	// Change this depending on the name of your PHP or XML file
	downloadUrl('user_data.xml', function(data) {
		var xml = data.responseXML;
		var markers = xml.documentElement.getElementsByTagName('marker');
		Array.prototype.forEach.call(markers, function(markerElem) {
			var id = markerElem.getAttribute('id');
			var name = markerElem.getAttribute('name');
			var email = markerElem.getAttribute('email');
			var type = markerElem.getAttribute('type');
			var address = markerElem.getAttribute('address');
			geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == 'OK') { 
					var infowincontent = document.createElement('div');
					var strong = document.createElement('strong');
					strong.textContent = name
			
					var text = document.createElement('text');
					text.textContent = email
					infowincontent.appendChild(text);
					
					infowincontent.appendChild(strong);
					infowincontent.appendChild(document.createElement('br'));
					infowincontent.appendChild(text);
					
					var icon = customLabel[type] || {};
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location,
						label: icon.label
					});
					
					marker.addListener('click', function() {
						infoWindow.setContent(infowincontent);
						infoWindow.open(map, marker);
					});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		});
	});
	
	infoWindow = new google.maps.InfoWindow;
	
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
		new ActiveXObject('Microsoft.XMLHTTP') :
		new XMLHttpRequest;

  request.onreadystatechange = function() {
		if (request.readyState == 4) {
			request.onreadystatechange = doNothing;
			callback(request, request.status);
		}
	};

	request.open('GET', url, true);
	request.send(null);
}

// getting basic user info
function getUserInfo() {
  var map = new google.maps.Map(document.getElementById('map'), {
	var geocoder = new google.maps.Geocoder();
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
	geocoder.geocode( { 'location': pos}, function(results, status) {
		if (status === 'OK') {
      if (results[0]) {
				document.getElementById('location').innerHTML = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function doNothing() {}