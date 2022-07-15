
class Game {
	#Config

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
		this.#add_event()
	}
	#init_() {
		// ----------- mobs
		// let liste = ['Antho', 'Benoist', 'Renaud', 'Eslam', 'Charles-L', 'Guillaume', 'Pyl', 'Rémi', 'Audrey', 'Cédric', 'Feun']
		let liste = ['Alice', 'Bob']
		liste.forEach(element => {

			this.#Mobs.addOne(element)

		});

		this.#allMobs = this.#Mobs.get_allMobs()

		// warn check if empty Mobs (to erase)
		if (this.#allMobs.length <= 0) console.warn('no mobs found')

		console.warn('this IS wrong(not same mob but same mobdiv', this.#allMobs)
		this.#Dom.add_AllMobsToDom(this.#allMobs)

		this.Animate = new Animate(this.#Config, this.#allMobs)

		this.start()


	}
	#add_event() {
		window.onresize = () => {
			// console.log('ff', window.innerWidth, window.innerHeight)
		}
	}
	start() {
		this.Animate.start_Animate()
	}
}
