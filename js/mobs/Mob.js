class Mob {
	#conf = {}
	#divs = {}
	// --
	#ia
	constructor(conf) {
		this.#conf = conf

		this.#init()
	}
	#init() {

		this.#set_MobDivs()

		this.#ia = new MobsIa() // is this bad clone ??

		return this
	}
	update = () => {
		this.#ia.iaAction(this.#conf)
		this.#refresh_Div()
		// console.log(this.#conf)
	};
	#refresh_Div() {
		// BUGGY		// BUGGY		// BUGGY
		this.set_divAttrib('range', 'rotate(' + this.#conf.theta.cur + 'deg)', 'style', 'transform')
		this.set_divAttrib('ico', this.#conf.theta.cur + '°', 'textContent', false)
		this.set_divAttrib('prima', (this.#conf.position.y - (this.#conf.divs.prima.size.y / 2)) + 'px', 'style', 'top')
		this.set_divAttrib('prima', (this.#conf.position.x - (this.#conf.divs.prima.size.x / 2)) + 'px', 'style', 'left')
	}
	// -------------------------------------------------------------
	#set_MobDivs() {
		for (var key in this.#conf.divs) {
			this.#divs[key] = document.createElement('div')
		};
	}
	// -------------------------------------------------------------
	get_nickName() {
		return this.#conf.nickName
	}
	get_conf() {
		return this.#conf
	}
	get_div(nameDiv) {
		if (this.#divs[nameDiv]) return this.#divs[nameDiv]
	}
	// -------------------------------------------------------------
	set_divAttrib(target, value = false, attribute = false, attribute2 = false) {
		if (this.#divs[target] && value) {
			if (attribute && attribute2) {
				this.#divs[target][attribute][attribute2] = value
			}
			else if (attribute && !attribute2) {
				this.#divs[target][attribute] = value
			}
		}
	}
}
