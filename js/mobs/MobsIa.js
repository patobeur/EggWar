class MobsIa {
	#Formula
	#Mob
	constructor(Formula, Mob) {
		this.#Formula = Formula
		this.#Mob = Mob
	}
	iaAction() {
		let action = [
			0, // move
			1, // go left
			2, // go right
			3, // do nothing
		]
		let actionConf = this.#Mob.conf.ia.changeAction

		// console.log(this.#Mob.conf.id, this.#Mob.conf)
		if (actionConf.cur < 1) {

			actionConf.lastAction = actionConf.currentAction

			// new random action -----------------------------------------------------------------
			actionConf.currentAction = this.#Formula.get_aleaEntreBornes(0, action.length)

			switch (actionConf.currentAction) {
				case 0:
					this.#chooseDir()
					break;
				case 1:
				case 2:
				case 3:
				default:
					break;
			}
		}
		else {
			this.#keepMoving()
		}
		// one more tic
		actionConf.cur++

		// set cur to min if cur is bigger than max
		if (actionConf.cur > actionConf.max) {
			actionConf.cur = 0
		}
		let theta = this.#Formula.get_aleaEntreBornes(
			this.#Mob.conf.theta.min,
			this.#Mob.conf.theta.max
		)
		// console.log('---------')
		// console.log(this.#Mob.conf.name, this.#Mob.conf.theta.cur, this.#Mob.conf.position)
	}
	#chooseDir() {
		let dir = this.#Formula.get_aleaEntreBornes(0, 1) > 0 ? -1 : 1;

		this.#Mob.conf.theta.cur += Math.floor(dir * this.#Mob.conf.ia.dirAmplitude)

		// console.log(this.#Mob.conf.name, this.#Mob.conf.theta.cur, this.#Mob.conf.position)

		// if (this.#Mob.conf.theta.cur > this.#Mob.conf.theta.max) {
		// 	this.#Mob.conf.theta.cur = this.#Mob.conf.theta.cur - 360
		// }
		// if (this.#Mob.conf.theta.cur < 0) {
		// 	this.#Mob.conf.theta.cur = 360 + this.#Mob.conf.theta.cur
		// }
		// console.log(dir, this.#Mob.conf.theta.cur)
	}
	#keepMoving() {
		// console.log('move')
		let nextpos = this.#Formula.get_NextPos(
			this.#Mob.conf.position.x,
			this.#Mob.conf.position.y,
			this.#Mob.conf.theta.cur,
			this.#Mob.conf.speed
		)
		this.#Mob.conf.position.y = nextpos.y
		this.#Mob.conf.position.x = nextpos.x


		this.#Mob.mobdiv.style.top = (nextpos.y - (this.#Mob.conf.position.y / 2)) + 'px'
		this.#Mob.mobdiv.style.left = (nextpos.x - (this.#Mob.conf.position.x / 2)) + 'px'

		this.#Mob.mobdiv.style.webkitTransform = 'rotate(' + this.#Mob.conf.theta.cur + 'deg)';
		this.#Mob.mobdiv.style.mozTransform = 'rotate(' + this.#Mob.conf.theta.cur + 'deg)';
		this.#Mob.mobdiv.style.msTransform = 'rotate(' + this.#Mob.conf.theta.cur + 'deg)';
		this.#Mob.mobdiv.style.oTransform = 'rotate(' + this.#Mob.conf.theta.cur + 'deg)';
		this.#Mob.mobdiv.style.transform = 'rotate(' + this.#Mob.conf.theta.cur + 'deg)';
		this.#Mob.ico.style.transform = 'rotate(' + -this.#Mob.conf.theta.cur + 'deg)';
		this.#Mob.ico.textContent = this.#Mob.conf.theta.cur + '°';

		// this.#Mob.mobdiv.style.rotate = (this.#Mob.conf.theta.cur) + 'deg'
		// console.log('--', this.#Mob.mobdiv.style.rotate)
	}
	#changeDir(mob) {
		this.#Mob.conf.theta.cur = this.#Formula.get_aleaEntreBornes(
			this.#Mob.conf.theta.min,
			this.#Mob.conf.theta.max
		)
	}
	get_Ia() {
		return { ... this }
	}
	consoleDebug(debug = 'debuging') {
		console.debug(debug)
	}
}
