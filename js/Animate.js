class Animate {
	#Config
	// #Mobs
	#AllMobs
	#interval
	#Render
	constructor(Config, Mobs, AllMobs) {
		this.#Config = Config
		// this.#Mobs = Mobs
		this.#AllMobs = AllMobs
		this.#init_()
	}
	#init_ = () => {
		console.log(Mobs)
		console.log(this.#AllMobs)
		this.#interval = this.#Config.get_('Animate').interval
	}
	#animate = () => {
		// this.#Mobs.update()
		this.#AllMobs.forEach(mob => {
			mob.update(mob)
		});

	}
	start_Animate() {
		this.#Render = setInterval(this.#animate, this.#interval)
	}
	stop_Animate() {
		clearInterval(this.#Render);
	}
}
