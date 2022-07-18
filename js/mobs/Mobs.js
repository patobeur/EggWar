class Mobs {
	#AllMobs
	#CurrentMobImmat
	#Formula
	constructor() {

		this.#AllMobs = []
		this.#CurrentMobImmat = 0
		this.#Formula = new Formula()
	}

	addOne(nickname = false, mobType = 'mobs') {

		this.mobConf = new MobConfig()

		// i get a clone with the default config
		let conf = this.mobConf.get_(mobType)

		// adding basics to feet the needs
		conf.immat = this.#CurrentMobImmat
		conf.id = 'M_' + conf.immat
		conf.position = this.#Formula.get_aleaPosOnScreen(conf.divs.prima.size)
		conf.nickname = (!nickname === false) ? nickname : new String('UnNamed_') + conf.immat;
		conf.theta.cur = this.#Formula.rand(0, 360)

		// push a fresh mob with fresh conf to allMob arrray
		this.#AllMobs.push(new Mob(
			conf
		))

		// set the new immat
		this.#CurrentMobImmat = this.#AllMobs.length
	}
	// -------------------------------------------------------------
	get_allMobs() {
		return this.#AllMobs.length > 0 ? this.#AllMobs : false;
	}

}
