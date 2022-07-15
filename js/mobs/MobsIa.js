class MobsIa {
	#Formula
	#Mob
	#conf
	constructor(Mob) {
		this.#Formula = new Formula()
		this.#Mob = Mob
		this.#conf = this.#Mob.get_conf()
	}
	iaAction() {
		let action = [
			0, // chooseDir
			1, // chooseDir
			2, // chooseDir
			3, // changeDir
			4, // nothing
		]
		let actionConf = this.#conf.ia.changeAction

		if (this.#conf.ia.changeAction.cur < 1) {

			this.#conf.ia.changeAction.lastAction = this.#conf.ia.changeAction.currentAction

			// new random action -----------------------------------------------------------------
			this.#conf.ia.changeAction.currentAction = this.#Formula.get_aleaEntreBornes(0, action.length)

			switch (this.#conf.ia.changeAction.currentAction) {
				case 0:
				case 1:
				case 2:
					this.#chooseDir()
					break;
				case 3:
					this.#changeDir()
				case 4:
				default:
					break;
			}
		}
		else {
			this.#keepMoving()
		}




		// one more tic
		this.#conf.ia.changeAction.cur++

		// set cur to min if cur is bigger than max
		if (this.#conf.ia.changeAction.cur > this.#conf.ia.changeAction.max) {
			this.#conf.ia.changeAction.cur = 0
		}
		// let theta = this.#Formula.get_aleaEntreBornes(
		// 	this.#conf.theta.min,
		// 	this.#conf.theta.max
		// )
	}
	#chooseDir() {

		let dir = this.#Formula.get_aleaEntreBornes(0, 1) > 0 ? -1 : 1;
		this.#conf.theta.cur += Math.floor(dir * this.#conf.ia.dirAmplitude)
		// keep degree between 0 and 360
		// care with css rotate transitions delay
		// if (this.#conf.theta.cur > 360) this.#conf.theta.cur -= 360;
		// if (this.#conf.theta.cur < 0) this.#conf.theta.cur += 360;
		// console.log(dir, this.#conf.theta.cur)
		this.#refresh_Div()

	}
	#keepMoving() {

		let nextpos = this.#Formula.get_NextPos(
			this.#conf.position.x,
			this.#conf.position.y,
			this.#conf.theta.cur,
			this.#conf.speed
		)
		this.#conf.position.y = nextpos.y
		this.#conf.position.x = nextpos.x


		this.#Mob.mobdiv.style.top = (nextpos.y - (this.#conf.position.y / 2)) + 'px'
		this.#Mob.mobdiv.style.left = (nextpos.x - (this.#conf.position.x / 2)) + 'px'

	}
	#changeDir() {
		this.#conf.theta.cur = this.#Formula.get_aleaEntreBornes(
			this.#conf.theta.min,
			this.#conf.theta.max
		)
	}
	// --------------
	#refresh_Div() {
		this.#Mob.range.style.webkitTransform = 'rotate(' + this.#conf.theta.cur + 'deg)';
		this.#Mob.range.style.mozTransform = 'rotate(' + this.#conf.theta.cur + 'deg)';
		this.#Mob.range.style.msTransform = 'rotate(' + this.#conf.theta.cur + 'deg)';
		this.#Mob.range.style.oTransform = 'rotate(' + this.#conf.theta.cur + 'deg)';
		this.#Mob.range.style.transform = 'rotate(' + this.#conf.theta.cur + 'deg)';

		// rotate counter
		// this.#Mob.ico.style.transform = 'rotate(' + (-this.#conf.theta.cur) + 'deg)';

		this.#Mob.ico.textContent = this.#conf.theta.cur + '°';

	}
}
