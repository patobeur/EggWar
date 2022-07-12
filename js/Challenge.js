
class Challenge {
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
	}
	#init_() {
		// ----------- mobs
		this.#Mobs.addOne('Alice')
		this.#Mobs.addOne('Bob')
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#Mobs.addOne()
		this.#allMobs = this.#Mobs.get_allMobs()
		this.#Dom.add_AllMobsToDom(this.#allMobs)

		this.Animate = new Animate(this.#Config, this.#Mobs)
		this.Animate.run_Animation()
	}
}
