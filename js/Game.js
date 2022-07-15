
class Game {
	#Config
	#Animate
	// mobs
	#Mobs;
	#allMobs

	// dom html
	#Dom
	constructor() {
		this.#Config = new Config()
		this.#Dom = new Dom(this.#Config)
		this.#Mobs = new Mobs(this.#Config)
		// --
		this.#init_()
		// this.#add_event()
	}
	#init_() {

		// let liste = ['Antho', 'Benoist', 'Renaud', 'Eslam', 'Charles-L', 'Guillaume', 'Pyl', 'Rémi', 'Audrey', 'Cédric', 'Feun']

		['Alice', 'Bob'].forEach(element => {

			this.#Mobs.addOne(element)

		});

		this.#allMobs = this.#Mobs.get_allMobs()

		this.#Dom.add_AllMobsToDom(this.#allMobs)

		this.#Animate = new Animate(this.#Config, this.#allMobs)

		this.start()


	}
	#add_event() {
		window.onresize = () => {
			// console.log(window.innerWidth, window.innerHeight)
		}
	}
	start() {
		this.#Animate.start_Animate()
	}
}
