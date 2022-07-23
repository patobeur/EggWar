
class Game {
	#GameConfig
	#AnimateDom

	#Mobs;
	#allMobs

	#Players
	#allPlayers

	constructor() {
		this.#GameConfig = new GameConfig()

		this.#Mobs = new Mobs()
		this.#Players = new Players()

		this.#init_()
	}

	#init_() {
		let rangers = ['Guillaume', 'Pyl', 'Charlotte', 'Frédéric', 'Rémi', 'Eslam', 'Charles-L', 'Audrey', 'Cédric', 'Antho', 'Renaud', 'Feun']
		rangers.forEach(element => this.#Mobs.addOne(element));
		this.#allMobs = this.#Mobs.get_allMobs()

		let gentils = ['Alice', 'Bob']
		gentils.forEach(element => this.#Players.addOne(element));
		this.#allPlayers = this.#Players.get_allPlayers()

		this.#AnimateDom = new AnimateDom(this.#allMobs, this.#allPlayers)
		this.#start()
	}
	#start() {
		this.#AnimateDom.start_Render()
	}
}
