class MobsIa {
	constructor() {
		this.Formula = new Formula()
	}
	iaAction(conf) {
		if (conf.ia.changeAction.cur === 0) {
			this.#chooseDir(conf)
		}

		conf.ia.changeAction.cur = conf.ia.changeAction.cur > conf.ia.changeAction.max
			? 0
			: conf.ia.changeAction.cur + 1

		this.#keepMoving(conf)
	}
	#chooseDir(conf) {
		let dir = this.Formula.rand(0, 1) > 0 ? -1 : 1;
		console.log('chooseDir', dir)
		conf.theta.cur += Math.floor(dir * conf.ia.dirAmplitude)

	}
	#keepMoving(conf) {
		let nextpos = this.Formula.get_NextPos(
			conf.position.x,
			conf.position.y,
			conf.theta.cur,
			conf.speed
		)
		conf.position.y = nextpos.y
		conf.position.x = nextpos.x

	}
	#changeDir(conf) {
		conf.theta.cur = this.Formula.rand(
			conf.theta.min,
			conf.theta.max
		)
	}
}
