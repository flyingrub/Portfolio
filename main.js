var screenWidth, screenWidth ;

window.onresize = function(event) {

};

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


// SETUP VIEW
var goToThisCard = function(pos) {
	Data.pos = -pos* 1920
}

var allCards = new Vue({
	el: '#all-frames',
	data: Data
})

var footer = new Vue({
	el: '#footer',
	data: {
		size: Data.numberOfCard,
		px: 65 * Data.numberOfCard
	},
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

