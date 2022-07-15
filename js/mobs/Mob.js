class Mob {
	#CurrentMobImmat;
	#Config;
	#Formula;
	#MobsIa
	// --
	#name
	#Conf
	constructor(name, Config, CurrentMobImmat) {
		this.#name = name
		this.#Config = Config
		this.#CurrentMobImmat = CurrentMobImmat

		this.#Formula = new Formula()
		this.#init()
	}

	get_name() {
		return this.#name
	}
	get_conf() {
		return this.#Conf
	}
	#init() {

		// set a fresh conf
		this.#Conf = this.#Config.get_('mobs')
		this.#Conf = { ...this.#Conf }
		// set start position 
		this.#Conf.position = this.#Formula.get_aleaPosOnScreen(this.#Conf.divs.mobdiv.size)
		this.#Conf.name = (!this.#name === false) ? this.#name : 'Clone_' + this.#Formula.get_aleaEntreBornes(1, 99999);
		this.#Conf.id = 'Mob_' + this.#CurrentMobImmat

		// this.#Mob = { conf: { ...this.#Conf } }

		// ADD IA
		this.#set_MobDivs()

		this.#MobsIa = new MobsIa(this)

		console.log('return this', this)

		return this
	}
	update = () => {
		this.#MobsIa.iaAction()
	};
	// -------------------------------------------------------------
	#set_MobDivs() {
		this.mobdiv = document.createElement('div')
		this.range = document.createElement('div')
		this.dir = document.createElement('div')
		this.ico = document.createElement('div')
	}
}
