class Mob {
	#CurrentMobImmat = new Number(0);
	#Conf = {}
	#Formula = {}
	#MobsIa = {}
	// --
	#name = new String('UnNamed')
	#divs = {}
	constructor(name = false, newConf, CurrentMobImmat) {
		this.#name = name
		this.#Conf = newConf
		this.#CurrentMobImmat = CurrentMobImmat

		this.#Formula = new Formula()
		this.#init()
	}
	#init() {

		this.#set_MobDivs()

		// // ADD IA
		this.#MobsIa = new MobsIa(this)

		return this
	}
	update = () => {
		this.#MobsIa.iaAction()
	};
	// -------------------------------------------------------------
	get_name() {
		return this.#name
	}
	get_conf() {
		return this.#Conf
	}
	set_div(target, value = false, attribute = false, attribute2 = false) {
		if (this.#divs[target] && value) {
			if (attribute && attribute2) {
				this.#divs[target][attribute][attribute2] = value
			}
			else if (attribute && !attribute2) {
				this.#divs[target][attribute] = value
			}
		}
	}
	get_div(nameDiv) {
		if (this.#divs[nameDiv]) return this.#divs[nameDiv]
	}
	// -------------------------------------------------------------
	#set_MobDivs() {
		for (var div in this.#Conf.divs) {
			this.#divs[div] = document.createElement('div')
		};
	}
}
