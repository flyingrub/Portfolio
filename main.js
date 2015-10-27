var w = window.innerWidth;
var currentCard = 0;
var oldScroll = new Date();
var canScroll = true;

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

// Listener

var classname = document.getElementsByClassName("card");

var onMouseOver = function() {
	hasScrollBar = this.scrollHeight!=this.clientHeight
    canScroll = !hasScrollBar;
};

var onMouseOut = function() {
    canScroll = true;
};

for(var i=0;i<classname.length;i++){
    classname[i].addEventListener('mouseover', onMouseOver, false);
    classname[i].addEventListener('mouseout', onMouseOut, false);
}

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
}

window.onkeydown = function(evt) {
    evt = evt || window.event;
    var keyCode = evt.keyCode;
    if (keyCode == 37) {
    	goToThisCard(currentCard -1);
    	evt.preventDefault()
    }
    if (keyCode == 39) {
    	goToThisCard(currentCard +1);
    	evt.preventDefault()
    }
    if (keyCode <= 38 && keyCode >= 40) {
        return false;
    }
};


