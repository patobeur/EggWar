
class Game {
	#GameConfig
	#Render

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
		let vilains = ['Guillaume', 'Pyl', 'Charlotte', 'Frédéric', 'Rémi', 'Eslam', 'Charles-L', 'Audrey', 'Cédric', 'Antho', 'Renaud', 'Feun']
		vilains.forEach(element => this.#Mobs.addOne(element));
		this.#allMobs = this.#Mobs.get_allMobs()

		let gentils = ['Alice', 'Bob']
		gentils.forEach(element => this.#Players.addOne(element));
		this.#allPlayers = this.#Players.get_allPlayers()

		this.#Render = new Render(this.#allMobs, this.#allPlayers)
		this.#start()
	}
	#start() {
		this.#Render.start_Render()
	}
}
