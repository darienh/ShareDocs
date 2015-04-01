var height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth; 

fb = require('facebook');
fb.appid = 678412252269074;
fb.permissions = ['publish_stream']; //or publish_actions? 
//fb.authorize();  not sure if I should leave this out

win2.add(fb.createLoginButton({
    top : 50,
    style : fb.BUTTON_STYLE_WIDE
}));

fb.forceDialogAuth = false;
fb.addEventListener('login', function(e) {
	if (e.error) {
		alert(e.error);
	} else if (e.cancelled) {
		alert("Cancelled");
	}
});

/* I think I can take this off
var button1 = Ti.UI.createButton({
	title: 'Button!',
	top: '50%'
});

button1.addEventListener('click', function(e){
	fb.authorize();	
});

win2.add(button1);
*/


//A function that will send the screenshot to FB
//Step 8 In Book
function facebookScreenshot(data){
	//construct the photo object
	var thePhoto = {
		message: 'Portfolio of Darien',
		picture: data
	};
	fb.requestWithGraphPath('me/photos', thePhoto, 'POST', 
	function(e) {
		if (e.success) {
			alert("Success! From FB: " + e.result);
		} else {
			alert("Unknown result");
		}
	});
}

function captureScreenForFacebook() {
	Ti.Media.takeScreenshot(function(e)
	{
		//The media property of the object passed incontains the screenshot
		facebookScreenshot(e.media);
	});
}



var facebookBtn = Ti.UI.createButton({
	title: 'Share My Portfolio!'
});

facebookBtn.addEventListener('click', function(e){
	//
	captureScreenForFacebook();
});

win2.add(facebookBtn);
