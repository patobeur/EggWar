class Mobs {
	#Config
	#AllMobs
	#CurrentMobImmat
	#Formula
	constructor(Config) {
		this.#Config = Config
		this.#AllMobs = []
		this.#CurrentMobImmat = 0
		this.#Formula = new Formula()
	}

	addOne(name = false, mobType = 'mobs') {
		let newConf = this.#Config.get_(mobType)

		newConf.position = this.#Formula.get_aleaPosOnScreen(newConf.divs.mobdiv.size)
		newConf.theta.cur = this.#Formula.get_aleaEntreBornes(0, 360)
		newConf.name = (!name === false) ? name : 'Clone_' + this.#Formula.get_aleaEntreBornes(1, 99999);
		newConf.id = 'Mob_' + this.#CurrentMobImmat
		// newConf.navigator = navigator

		let newmob = new Mob(
			name,
			newConf,
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
