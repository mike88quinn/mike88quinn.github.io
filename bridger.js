window.fbAsyncInit = function() {
	FB.init({
		appId				: '698670277184912',
		cookie			: true,  // enable cookies to allow the server to access 
												// the session
		xfbml				: true,  // parse social plugins on this page
		version			: 'v3.2' // use graph api version 3.2
	});
	
	FB.AppEvents.logPageView(); 

};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}