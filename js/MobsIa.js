class MobsIa {
	#Formula
	constructor(Formula) {
		this.#Formula = Formula
	}
	iaAction(mob) {
		let action = [
			0, // move
			1, // go left
			2, // go right
			3, // do nothing
		]
		let actionConf = mob.conf.ia.changeAction

		//console.log(mob.conf.id, mob.conf)
		if (actionConf.cur < 1) {

			actionConf.lastAction = actionConf.currentAction

			// new random action -----------------------------------------------------------------
			actionConf.currentAction = this.#Formula.get_aleaEntreBornes(0, action.length)

			switch (actionConf.currentAction) {
				case 0:
					break;
				case 1:
				case 2:
				case 3:
					this.#chooseDir(mob)
					break;
				default:
					break;
			}
		}
		else {
			this.#keepMoving(mob)
		}
		// one more tic
		actionConf.cur++

		// set cur to min if cur is bigger than max
		if (actionConf.cur > actionConf.max) {
			actionConf.cur = 0
		}
		let theta = this.#Formula.get_aleaEntreBornes(
			mob.conf.theta.min,
			mob.conf.theta.max
		)
		// console.log('---------')
		// console.log(mob.conf.name, mob.conf.theta.cur, mob.conf.position)
	}
	#chooseDir(mob) {
		let dir = this.#Formula.get_aleaEntreBornes(0, 1) > 0 ? -1 : 1;

		mob.conf.theta.cur += Math.floor(dir * mob.conf.ia.dirAmplitude)

		// console.log(mob.conf.name, mob.conf.theta.cur, mob.conf.position)

		// if (mob.conf.theta.cur > mob.conf.theta.max) {
		// 	mob.conf.theta.cur = mob.conf.theta.cur - 360
		// }
		// if (mob.conf.theta.cur < 0) {
		// 	mob.conf.theta.cur = 360 + mob.conf.theta.cur
		// }
		// console.log(dir, mob.conf.theta.cur)
	}
	#keepMoving(mob) {
		// console.log('move')
		let nextpos = this.#Formula.getNextPos(
			mob.conf.position.x,
			mob.conf.position.y,
			mob.conf.theta.cur,
			mob.conf.speed
		)
		mob.conf.position.y = nextpos.y
		mob.conf.position.x = nextpos.x


		mob.mobdiv.style.top = (nextpos.y - (mob.conf.position.y / 2)) + 'px'
		mob.mobdiv.style.left = (nextpos.x - (mob.conf.position.x / 2)) + 'px'

		mob.mobdiv.style.webkitTransform = 'rotate(' + mob.conf.theta.cur + 'deg)';
		mob.mobdiv.style.mozTransform = 'rotate(' + mob.conf.theta.cur + 'deg)';
		mob.mobdiv.style.msTransform = 'rotate(' + mob.conf.theta.cur + 'deg)';
		mob.mobdiv.style.oTransform = 'rotate(' + mob.conf.theta.cur + 'deg)';
		mob.mobdiv.style.transform = 'rotate(' + mob.conf.theta.cur + 'deg)';

		// mob.mobdiv.style.rotate = (mob.conf.theta.cur) + 'deg'
		// console.log('--', mob.mobdiv.style.rotate)
	}
	#changeDir(mob) {
		mob.conf.theta.cur = this.#Formula.get_aleaEntreBornes(
			mob.conf.theta.min,
			mob.conf.theta.max
		)
	}
	get_Ia() {
		return { ... this }
	}
	consoleDebug(debug = 'debuging') {
		console.debug(debug)
	}
}
