
class Game {
	#Config
	#AnimateDom

	#Mobs;
	#allMobs

	// #Players
	// #allPlayers

	#Dom
	constructor() {
		this.#Config = new Config()
		this.#Mobs = new Mobs()
		// this.#Players = new Players(this.#Config)
		// --
		this.#init_()
		// this.#add_event()
	}
	#init_() {
		let liste = ['Alice', 'Bob']//, 'Guillaume', 'Pyl', 'Charlotte', 'Frédéric', 'Rémi', 'Eslam', 'Charles-L', 'Audrey', 'Cédric' 'Antho', 'Renaud', 'Feun']

		liste.forEach(element => {
			this.#Mobs.addOne(element)
		});

		this.#allMobs = this.#Mobs.get_allMobs()

		// this.#Players.addOnePlayer('Feu')
		// this.#allPlayers = this.#Players.get_allPlayers()

		this.#AnimateDom = new AnimateDom(this.#Config, this.#allMobs) //, this.#allPlayers)
		this.start()

	}
	#add_event() {
		// window.onresize = () => {
		// 	console.log(window.innerWidth, window.innerHeight)
		// }
	}
	start() {
		this.#AnimateDom.start_AnimateDom()
	}
}
