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
					{ message: 'The aim of this project is to provide a better way to commute in the city of Montpellier. It provides an easy way to know the real and theoretical times of the next Bus/Tram of the TaM company.'},
					{ message: 'It involve creating an Android app that allow to display those shedules. The API is undocumented so I needed to reverse it by listening to the traffic of the official app. I also decompiled it.'},
					{ message: 'Moreover, I created a server written in python that allows users to report events in the TaM network.'}
				],
			link: 'https://github.com/flyingrub/TamTime'
		},
		{
			title: 'Alea',
			contents:
				[
					{ message: 'I started this project because I like music and use Soundcloud a lot. A moment ago, I saw some some audio reactive websites, and I decided to create mine.'},
					{ message: 'I had never worked with JavaScript before this project. I didn\'t have a lot experience with CSS either. That\'s why I decided to use the fewer libraries/framework as possible.'},
					{ message: 'I don\'t use the Soundcloud JavaScript libraries, because it uses flash. And I am pretty familiar with the soundcloud API so i rewrote my own one.'}
				],
			link: 'http://alea.xyz/'
		},
		{
			title: 'Secure Key',
			contents:
				[
					{ message: 'I have a raspberry pi and in my building the door is hard to unlock with the regular key.'},
					{ message: 'I had the idea to use the wires from my intercom and connect them to my raspberry pi. Then I only needed to write a little websocket in Python and a client for Android.'},
					{ message: 'Now, any of my friends who knows the code can download the app on the PlayStore, and open the front door of my building. It\'s secured with TLS, so no worries :).'}
				],
			link: 'https://github.com/flyingrub/SecureKey'
		},
		{
			title: 'Joy Division',
			contents:
				[
					{ message: 'This project is born after I read about Perlin noise and wanted to try to build something with P5.js.' },
					{ message: 'I have also always been fascinated by the artwork of the album Unknow pleasure of Joy Division that represent an image of radio waves from pulsar CP 1919.' },
					{ message: 'I thought it would be a great exercice to try to recreate an image that look like those radio waves. Each time you reload or click on the page a new one is created.' }
				],
			link: 'https://flyingrub.github.io/Joy-Division/'
		},
		{
			title: 'Audio Spectrum',
			contents:
				[
					{ message: 'I had already played with the WebAudio API with Alea.xyz, but was not entirely satisfied with the way I processed the frequential spectrum.' },
					{ message: 'I had no idea of what the data depicted exactly, just that the bass was at the start and the high at the end of the array representing the frequential spectrum.'},
					{ message: 'That\s why I decided to create this project. I wanted to know what frequency was represented and also display those in a logarithmic scale, as we percieve it.'}
				],
			link: 'https://flyingrub.github.io/AudioSpectrum/'
		}
	],
	pos: 0
};
Data.numberOfCard = Data.projects.length +1;
Data.allFramesWidth = 100 * Data.numberOfCard;
Data.oneCardWidth = 100 / Data.numberOfCard;

var footerData = {
	size: Data.numberOfCard,
	px: 70 * Data.numberOfCard,
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

