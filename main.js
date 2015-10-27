var w = window.innerWidth;
var currentCard = 0;
var oldScroll = new Date();
var mainAboutHover = false;


window.onresize = function(event) {
	w = window.innerWidth;
	goToThisCard(currentCard);
};

window.onwheel = function (e) {
	if (mainAboutHover) {
		return;
	}
	if (new Date() > oldScroll) {
		if (e.deltaY > 0) {
			goToThisCard(currentCard+1);
		} else {
			goToThisCard(currentCard-1);
		}
		oldScroll = new Date();
		oldScroll.setMilliseconds(oldScroll.getMilliseconds() + 500);
	}
}

document.getElementById('main-about').onmouseover = function () {
    mainAboutHover = true;
    console.log(mainAboutHover);
}

document.getElementById('main-about').onmouseout = function () {
    mainAboutHover = false;
    console.log(mainAboutHover);
}

// SETUP DATA 
var Data = {
	projects: [
		{ 
			title: 'TAMTIME', 
			content: 'His cognitis Gallus ut serpens adpetitus telo vel saxo iamque spes extremas.</br></br>Cum saepe multa, tum memini domi in hemicyclio sedentem, ut solebat, cum et ego essem una et pauci admodum familiares, in eum sermonem illum incidere qui tum forte multis erat in ore. Meministi enim profecto, Attice, et eo magis, quod P. Miratio vel querella.</br></br>Martinus agens illas provincias pro praefectis aerumnas innocentium graviter gemens saepeque obsecrans, ut ab omni culpa inmunibus parceretur, cum non inpetraret.</p>' 
		},
		{
			title: 'ALEA', 
			content: 'john@doh.com' 
		},
		{
			title: 'SECURE KEY', 
			content: 'john@doh.com' 
		}
	],
	pos: 0
}
Data.numberOfCard = Data.projects.length +1;
Data.allFramesWidth = 100 * Data.numberOfCard
Data.oneCardWidth = 100 / Data.numberOfCard

console.log(Data.numberOfCard)


var footerData = {
	size: Data.numberOfCard,
	px: 65 * Data.numberOfCard,
	current: 0
}

// SETUP VIEW
var goToThisCard = function(pos) {
	if (pos < 0 || pos > Data.projects.length) {
		return;
	}
	currentCard = pos;
	footerData.current = pos;
	Data.pos = -pos* w;
}

var allCards = new Vue({
	el: '#all-frames',
	data: Data
})

var footer = new Vue({
	el: '#footer',
	data: footerData,
	methods: {
		goTo: goToThisCard
	}
})

var header = new Vue({
	el: '#header',
	methods: {
		goTo: goToThisCard
	}
})



