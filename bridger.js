window.fbAsyncInit = function() {
	FB.init({
		appId				: '698670277184912',
		cookie			: true,  // enable cookies to allow the server to access 
												// the session
		xfbml				: true,  // parse social plugins on this page
		oauth				: true,
		version			: 'v3.2' // use graph api version 3.2
	});
	
	// Now that we've initialized the JavaScript SDK, we call 
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.
	
	
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response)
		if (response.status === 'connected') {
			// The user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire.
			if(window.location.href.indexOf("auth") > -1) {
				console.log('Authorized Location');
			} else {
				window.location.href = "https://mike88quinn.github.io/authHome.html";
			}
			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;
		} else {
			// The user isn't logged in to Facebook. You can launch a
			// login dialog with a user gesture, but the user may have
			// to log in to Facebook before authorizing your application.
			if(window.location.href.indexOf("auth") > -1) {
				window.location.href = "https://mike88quinn.github.io";
			}
		}
	});
 
	FB.Event.subscribe("auth.logout", function() {window.location.href = 'https://mike88quinn.github.io'});
	FB.Event.subscribe("auth.login", function() {window.location.href = 'https://mike88quinn.github.io/authHome.html'});
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			myFunction(this);
		}
	};
};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
		//document.getElementById('status').innerHTML = response.name;
	});
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		testAPI();
	} else {
		// The person is not logged into your app or we are unable to tell.
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// login with facebook with extra permissions
function login() {
	FB.login(function(response) {
		if (response.status === 'connected') {
    		document.getElementById('status').innerHTML = 'We are connected.';
    		document.getElementById('login').style.visibility = 'hidden';
    	} else if (response.status === 'not_authorized') {
    		document.getElementById('status').innerHTML = 'We are not logged in.'
    	} else {
    		document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
    	}
	}, {scope: 'email'});
}
		
// getting basic user info
function getFacebookPhoto() {
	FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,email,location,picture.width(150).height(150)'}, function(response) {
		document.getElementById('userPhoto').innerHTML = "<img src='" + response.picture.data.url + "'>";
		document.getElementById('name').innerHTML = response.name;
		document.getElementById('location').innerHTML = response.location;
		document.getElementById('email').innerHTML = response.email;
		document.getElementById('id').innerHTML = response.id;
	});
}