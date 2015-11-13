var w;
var currentCard = 0;
var oldScroll = new Date();
var canScroll = true;

// SETUP DATA 
var Data = {
	projects: [
		{ 
			title: 'TamTime', 
			contents: 
				[ 
					{ message: 'The goal of this project is to provide a better way to commute in the city of Montpellier. It provides an easy way to know the real and theoritcal times of the next Bus/Tram.'},
					{ message: 'I work mainly on the android part of this project. Some of my friends work on the backend handling the data we get from the API.'},
					{ message: 'We even integrated it with our own server, in order to get the report of event in the TAM network from the user of the app!'}
				],
			link: 'https://github.com/flyingrub/TamTime'
		},
		{
			title: 'Alea', 
			contents: 
				[ 
					{ message: 'I started this project because i like music and use soundcloud a lot. A moment ago, I saw some some audio reactive website. And i decided to create mine.'},
					{ message: 'I never worked with javascript before this project. And my css was not very good. That\'s why i decided to use the fewer libraries/framework as possible.'},
					{ message: 'I don\'t even use the soundcloud javascript libraries, because it use flash. And i am pretty familiar with the soundcloud API so i rewritten my own one.'}
				],
			link: 'http://alea.xyz/'
		},
		{
			title: 'Secure Key', 
			contents: 
				[ 
					{ message: 'I have a raspberry pi. And i let it unused a few time. But in my building the lock is hard to unlock. That\'s where the raspberry comes in.'},
					{ message: 'I had the idea to use the wire from my intercom and connect them to my raspberry pi. Then i only needed to write a little websocket in python. And a client for android.'},
					{ message: 'Now, any of my friend who know the code can download the app on the PlayStore. And open the front door of my building. It\'s securised with TLS, so no worries :).'}
				],
			link: 'https://github.com/flyingrub/SecureKey'
		}
	],
	pos: 0
};
Data.numberOfCard = Data.projects.length +1;
Data.allFramesWidth = 100 * Data.numberOfCard;
Data.oneCardWidth = 100 / Data.numberOfCard;

var footerData = {
	size: Data.numberOfCard,
	px: 65 * Data.numberOfCard,
	current: 0
};

// SETUP VIEW
var goToThisCard = function(pos) {
	if (pos < 0 || pos > Data.projects.length) {
		return;
	}
	currentCard = pos;
	footerData.current = pos;
	Data.pos = -pos* w;
};

var allCards = new Vue({
	el: '#all-frames',
	data: Data
});

var footer = new Vue({
	el: '#footer',
	data: footerData,
	methods: {
		goTo: goToThisCard
	}
});

var header = new Vue({
	el: '#header',
	methods: {
		goTo: goToThisCard
	}
});


// UI
var classname = document.getElementsByClassName("card");

function hasOverflow(el){
	return el.scrollHeight > el.clientHeight;
}

// Listener
var onMouseOver = function() {
	canScroll = !hasOverflow(this);
};

var onMouseOut = function() {
	canScroll = true;
};

for(var i=0;i<classname.length;i++){
	classname[i].addEventListener('mouseover', onMouseOver, false);
	classname[i].addEventListener('mouseout', onMouseOut, false);
};

window.onresize = function(event) {
	w = window.innerWidth;
	goToThisCard(currentCard);
};

window.onwheel = function (e) {
	if (canScroll && new Date() > oldScroll) {
		if (e.deltaY > 0) {
			goToThisCard(currentCard+1);
		} else {
			goToThisCard(currentCard-1);
		}
		oldScroll = new Date();
		oldScroll.setMilliseconds(oldScroll.getMilliseconds() + 500);
	}
};

window.onkeydown = function(evt) {
	evt = evt || window.event;
	var keyCode = evt.keyCode;
	if (keyCode == 37) {
		goToThisCard(currentCard -1);
		evt.preventDefault();
	}
	if (keyCode == 39) {
		goToThisCard(currentCard +1);
		evt.preventDefault();
	}
	if (keyCode <= 38 && keyCode >= 40) {
		return false;
	}
};

window.onscroll = function(event) {
	window.scrollTo(0, window.pageYOffset);
};

// TOUCH handler
swipe_det = new Object();
swipe_det.sX = 0;
swipe_det.sY = 0;
swipe_det.eX = 0;
swipe_det.eY = 0;
var min_x = 20;  //min x swipe for horizontal swipe
var max_x = 40;  //max x difference for vertical swipe
var min_y = 40;  //min y swipe for vertical swipe
var max_y = 50;  //max y difference for horizontal swipe


window.addEventListener('touchstart', function(e) {
	var t = e.touches[0];
	swipe_det.sX = t.screenX;
	swipe_det.sY = t.screenY;
});

window.addEventListener('touchmove', function(e) {
	var t = e.touches[0];
	swipe_det.eX = t.screenX;
	swipe_det.eY = t.screenY;
});

window.addEventListener('touchend', function(e) {
	//horizontal detection
	if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
		deltaX = Math.abs(swipe_det.sX - swipe_det.eX);
		deltaY = Math.abs(swipe_det.sY - swipe_det.eY);
		if (deltaY > deltaX) {
			return;
		}
		if(swipe_det.eX > swipe_det.sX) {
			direc = "r"; 
			goToThisCard(currentCard -1);
		} else {
			direc = "l";
			goToThisCard(currentCard +1);
		}
	}
});

// LOAD
window.onload = function() {
	setTimeout(hideLogo, 2000);
	detectBrowser();
};

// Particle
particlesJS.load('particles-js', 'node_modules/particles/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});


// Hide the logo
var hideLogo = function() {
	var logo = document.getElementById('flying-logo');
	logo.style.display = "none";
	w = window.innerWidth;	
};

function detectBrowser() {
	//alert(navigator.userAgent);
	if ((navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Firefox/i))
		|| navigator.userAgent.match(/Opera Mini/i)
		|| /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)
		) { 
		alert("Your mileage may vary according to your current browser. Please use Chrome or Opera on your mobile.")
	}
}

