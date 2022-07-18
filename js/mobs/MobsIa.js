class MobsIa {
	constructor() {
		this.Formula = new Formula()
	}
	iaAction(conf) {
		// if (conf.ia.changeAction.cur === 0) {
		// 	this.#chooseDir(conf)
		// }


		if (conf.ia.changeAction.cur === 0) {

			conf.ia.changeAction.lastAction = conf.ia.changeAction.currentAction

			// new random action
			let randDir = this.Formula.rand(0, 4)

			// console.log(conf.ia.changeAction.currentAction)
			switch (randDir) {
				case 0:
				case 1:
				case 2:
				case 3:
					break;
				case 4:
					this.#chooseDir(conf)
					break;
				default:
					break;
			}
		}
		else {
			this.#keepMoving(conf)
		}

		// set current tics to min if current is bigger than max
		conf.ia.changeAction.cur = conf.ia.changeAction.cur > conf.ia.changeAction.max
			? 0
			: conf.ia.changeAction.cur + 1

	}
	#chooseDir(conf) {
		let dir = this.Formula.rand(0, 1) > .5 ? 1 : -1;
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
