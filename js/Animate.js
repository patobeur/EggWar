class Animate {
	#Config
	// #Mobs
	#AllMobs
	#AllPlayers
	#interval
	#Render
	constructor(Config, AllMobs, AllPlayers) {
		this.#Config = Config
		this.#AllMobs = AllMobs
		this.#AllPlayers = AllPlayers
		this.#init_()
	}
	#init_ = () => {
		console.log('mobs:', this.#AllMobs)
		// console.log('Players:', this.#AllPlayers)
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
