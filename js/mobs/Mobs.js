class Mobs {
	#AllMobs
	#CurrentMobImmat
	#Formula
	constructor() {
		this.mobConf = new MobConfig()
		this.#AllMobs = []
		this.#CurrentMobImmat = 0
		this.#Formula = new Formula()
	}

	addOne(nickname = false, mobType = 'mobs') {
		let conf = this.mobConf.get_(mobType)

		// adding basics datas to conf
		conf.immat = this.#CurrentMobImmat
		conf.id = 'M_' + conf.immat

		conf.position = this.#Formula.get_aleaPosOnScreen(conf.divs.prima.size)
		conf.nickname = (!nickname === false) ? nickname : new String('UnNamed_') + conf.immat;
		conf.theta.cur = this.#Formula.rand(0, 360)

		let newmob = new Mob(
			conf
		)

		this.#AllMobs.push(newmob)
		this.#CurrentMobImmat = this.#AllMobs.length
	}

	// -------------------------------------------------------------
	get_allMobs() {
		return this.#AllMobs.length > 0 ? this.#AllMobs : false;
	}

}
