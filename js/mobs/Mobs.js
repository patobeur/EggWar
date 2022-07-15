class Mobs {
	#Config;
	#AllMobs;
	#CurrentMobImmat;

	constructor(Config) {
		this.#Config = Config
		this.#AllMobs = []
		this.#CurrentMobImmat = 0

	}

	addOne(name = false) {
		let newmob = new Mob(
			name,
			this.#Config,
			this.#CurrentMobImmat
		)

		this.#AllMobs.push(newmob)
		this.#CurrentMobImmat = this.#AllMobs.length
	}

	// -------------------------------------------------------------
	get_allMobs() {
		return this.#AllMobs.length > 0 ? this.#AllMobs : false;
	}

}
