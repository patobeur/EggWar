
class Game {
	#Config
	#Animate

	#Mobs;
	#allMobs

	// #Players
	// #allPlayers

	#Dom
	constructor() {
		this.#Config = new Config()
		this.#Dom = new Dom(this.#Config)
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

		this.#Dom.add_AllMobsToDom(this.#allMobs)

		// this.#Players.addOnePlayer('Feu')
		// this.#allPlayers = this.#Players.get_allPlayers()

		this.#Animate = new Animate(this.#Config, this.#allMobs) //, this.#allPlayers)
		this.start()

	}
	#add_event() {
		// window.onresize = () => {
		// 	console.log(window.innerWidth, window.innerHeight)
		// }
	}
	start() {
		this.#Animate.start_Animate()
	}
}
