var customLabel = {
	restaurant: {
		label: 'R'
	},
	bar: {
		label: 'B'
	}
};

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 12,
  });
  var infoWindow = new google.maps.InfoWindow;

	// Change this depending on the name of your PHP or XML file
	downloadUrl('mapmarkers2.xml?01', function(data) {
		var xml = data.responseXML;
		var markers = xml.documentElement.getElementsByTagName('marker');
		Array.prototype.forEach.call(markers, function(markerElem) {
			var id = markerElem.getAttribute('id');
			var name = markerElem.getAttribute('name');
			var address = markerElem.getAttribute('address');
			var type = markerElem.getAttribute('type');
			var point = new google.maps.LatLng(
					parseFloat(markerElem.getAttribute('lat')),
					parseFloat(markerElem.getAttribute('lng')));
	
			var infowincontent = document.createElement('div');
			var strong = document.createElement('strong');
			strong.textContent = name
			infowincontent.appendChild(strong);
			infowincontent.appendChild(document.createElement('br'));
	
			var text = document.createElement('text');
			text.textContent = address
			infowincontent.appendChild(text);
			var icon = customLabel[type] || {};
			var marker = new google.maps.Marker({
				map: map,
				position: point,
				label: icon.label
			});
			marker.addListener('click', function() {
				infoWindow.setContent(infowincontent);
				infoWindow.open(map, marker);
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

function doNothing() {}