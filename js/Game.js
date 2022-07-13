
class Game {
	#Config

	// mobs
	#Mobs; #allMobs

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
		this.#Mobs.addOne('Alice')
		this.#Mobs.addOne('Bob')

		this.#allMobs = this.#Mobs.get_allMobs()

		// warn check if empty Mobs (to erase)
		if (this.#allMobs.length <= 0) console.warn('no mobs found')
		console.warn('init', this.#allMobs)

		this.#Dom.add_AllMobsToDom(this.#allMobs)

		// le bug est là ???? #allMobs plutot que #Mobs ???
		this.Animate = new Animate(this.#Config, this.#Mobs, this.#allMobs)
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
