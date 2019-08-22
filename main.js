var w;
var currentCard = 0;
var oldScroll = new Date();
var canScroll = true;

// SETUP DATA
var Data = {
	projects: [
		{
			title: 'Alea',
			contents:
				[
					{ message: 'I started this project because I like music and use SoundCloud a lot. Some time ago, I saw some some audio reactive websites, and I decided to create mine.'},
					{ message: 'I had never worked with Javascript before this project. I didn\'t have a lot experience with CSS either. That\'s why I decided to use the least libraries/framework possible.'},
					{ message: 'I didn\'t use the SoundCloud Javascript library, because it uses flash. And I am pretty familiar with the SoundCloud API so I rewrote my own.'}
				],
			link: 'http://alea.xyz/'
		},
		{
			title: 'Joy Division',
			contents:
				[
					{ message: 'This project is born after I read about Perlin noise and wanted to try to build something with P5.js.' },
					{ message: 'I have also always been fascinated by the artwork of the album Unknow Pleasures by Joy Division that represent an image of radio waves from pulsar CP 1919.' },
					{ message: 'I thought it would be a great exercice to try to recreate an image that look like those radio waves. Each time you reload or click on the page a new one is created.' }
				],
			link: 'https://flyingrub.github.io/Joy-Division/'
		},
		{
			title: 'Audio Spectrum',
			contents:
				[
					{ message: 'I had already played with the WebAudio API with Alea.xyz, but was not entirely satisfied with the way I processed the frequency spectrum.' },
					{ message: 'I had no idea what the data depicted exactly, just that the bass was at the start and the high at the end of the array representing the frequency spectrum.'},
					{ message: 'That\s why I decided to create this project. I wanted to know what frequency was represented and also display those in a logarithmic scale, as we perceive it.'}
				],
			link: 'https://flyingrub.github.io/AudioSpectrum/'
		},
		{
			title: 'Redux VST',
			contents:
			[
				{ message: 'I recently bought Bitwig because I wanted to be able to make music on Linux and love the modular environment they provide.'},
				{ message: 'But I was missing Redux, a plugin I was use to use on Ableton. And I thought it could be fun to recreate it as my first VST.'},
				{ message: 'It is a fairly simple VST and I already had the idea on how to implement it. The hardest part is to get it to work on Linux.'}
			],
		link: 'https://github.com/flyingrub/Redux'
		},
		{
			title: 'Creative JS',
			contents:
			[
				{ message: 'I saw a friend\'s drawing on social media and I was wondering if I could achieve to recreate something similar using code.'},
				{ message: 'This website is now holding this attempt and others experiments.'},
				{ message: 'I also managed to create controlled random noise in order to create a perfect gif loop on the Circles experiment.'}
			],
		link: 'https://flyingrub.github.io/creative-js/'
		},
		{
			title: 'FFGL Plugins',
			contents:
			[
				{ message: 'As an Intern at Resolume, a company providing software for VJ, I did work on improving the FreeFrameGL protocol. This protocol allow an application to host plugin in order to extend its capabilities, providing new visual effects.'},
				{ message: 'My work involved fixing old bugs, adding some functionnalities to the protocol and creating a little framework to ease the creation of plugin.'},
				{ message: 'I also created a few plugins while working there, in order to test my modifications and learn more about OpenGL.'}
			],
		link: 'https://github.com/flyingrub/ffgl'
		},
		{
			title: 'Secure Key',
			contents:
				[
					{ message: 'I have a Raspberry Pi and in my building the door is hard to unlock with the regular key.'},
					{ message: 'I had the idea to use the wires from my intercom and connect them to my raspberry pi. Then I only needed to write a little websocket in Python and a client for Android.'},
					{ message: 'Now, any of my friends who knows the code can download the app on the Play Store, and open the front door of my building. It\'s secured with TLS, so no worries. :)'}
				],
			link: 'https://github.com/flyingrub/SecureKey'
		},
		{
			title: 'TamTime',
			contents:
				[
					{ message: 'The purpose of this project is to provide a better way to commute in the city of Montpellier. It provides an easy way to know the real and theoretical times of the next Bus/Tram of the TaM company.'},
					{ message: 'It involves creating an Android app that allows to display those shedules. The API is undocumented so I needed to reverse it by listening to the traffic of the official app. I also decompiled it.'},
					{ message: 'Moreover, I created a server written in python that allows users to report events in the TaM network.'}
				],
			link: 'https://github.com/flyingrub/TamTime'
		},
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
	data: Data,
	methods: {
		goToNext: () => goToThisCard(currentCard+1)
	}
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

// Hide the logo
var hideLogo = function() {
	var logo = document.getElementById('flying-logo');
	logo.style.display = "none";
	w = window.innerWidth;
};

