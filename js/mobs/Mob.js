class Mob {
	constructor(conf) {
		this.conf = conf
		this.#init()
	}
	#init() {
		this.ia = new MobsIa()
		this.#set_Divs()
		return this
	}
	update = () => {
		this.ia.iaAction(this.conf)
		this.#refresh_Div()
	};
	#set_Divs() {
		this.divs = {}
		for (var key in this.conf.divs) {
			this.divs[key] = document.createElement('div')
		};
	}
	// ------------------------------------------------------------------------------------
	// this must go to AnimateDom class ???
	#refresh_Div() {
		this.#set_divAttrib('range', 'rotate(' + this.conf.theta.cur + 'deg)', 'style', 'transform')
		this.#set_divAttrib('ico', this.conf.theta.cur + '°', 'textContent', false)
		this.#set_divAttrib('prima', (this.conf.position.y - (this.conf.divs.prima.size.y / 2)) + 'px', 'style', 'top')
		this.#set_divAttrib('prima', (this.conf.position.x - (this.conf.divs.prima.size.x / 2)) + 'px', 'style', 'left')
	}
	#set_divAttrib(target, value = false, attribute = false, attribute2 = false) {
		if (this.divs[target] && value) {
			if (attribute && attribute2) {
				this.divs[target][attribute][attribute2] = value
			}
			else if (attribute && !attribute2) {
				this.divs[target][attribute] = value
			}
		}
	}
}
