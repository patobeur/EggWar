class Animate {
	#Config
	// #Mobs
	#AllMobs
	#interval
	#Render
	constructor(Config, AllMobs) {
		this.#Config = Config
		this.#AllMobs = AllMobs
		this.#init_()
	}
	#init_ = () => {
		console.log('mobs:', this.#AllMobs)
		this.#interval = this.#Config.get_('Animate').interval
	}
	#animate = () => {
		if (this.#AllMobs.length > 0) {
			this.#AllMobs.forEach(mob => {
				mob.update()
			});
		}
	}
	start_Animate() {
		this.#Render = setInterval(this.#animate, this.#interval)
	}
	stop_Animate() {
		clearInterval(this.#Render);
	}
}
