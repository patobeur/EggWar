class Animate {
	#Config
	#Mobs
	#interval
	#Render
	constructor(Config, Mobs) {
		this.#Config = Config
		this.#Mobs = Mobs
		this.#init_()
	}
	#init_ = () => {
		this.#interval = this.#Config.get_('Animate').interval
	}
	#animate = () => {
		this.#Mobs.update()
	}
	run_Animation() {
		this.#Render = setInterval(this.#animate, this.#interval)
	}
	stop_Animation() {
		clearInterval(this.#Render);
	}
}
