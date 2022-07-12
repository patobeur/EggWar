class Mobs {
	#Mobs; #MobsIa;
	#CurrentMobImmat;
	#Config;
	#Formula;

	constructor(Config) {
		this.#Config = Config
		this.#Formula = new Formula()
		this.#Mobs = []
		this.#CurrentMobImmat = 0
		this.#cssMaker()
	}

	addOne(name = false) {

		// set a fresh conf

		let conf = this.#Config.get_('mobs')
		// set start position 
		conf.position = this.#Formula.get_aleaPosOnScreen(conf.divs.mobdiv.size)

		conf.name = (!name === false) ? name : 'Clone_' + this.#Formula.get_aleaEntreBornes(1, 99999);
		conf.id = 'Mob_' + this.#CurrentMobImmat

		let newMob = { conf: { ...conf } }

		// INSERT IA
		newMob.mobIa = new MobsIa(this.#Formula)

		this.#set_MobDivs(newMob)
		this.#addToMobsArray(newMob)
	}

	update() {
		for (let index = 0; index < this.#Mobs.length; index++) {

			this.#Mobs[index].mobIa.iaAction(this.#Mobs[index])

		}
	}

	#addToMobsArray(newMob) {
		this.#Mobs.push(newMob)
		this.#CurrentMobImmat = this.#Mobs.length
	}

	// -------------------------------------------------------------

	#set_MobDivs(newMob) {
		newMob.mobdiv = document.createElement('div')
		newMob.range = document.createElement('div')
		newMob.dir = document.createElement('div')
		newMob.ico = document.createElement('div')
	}

	#cssMaker = () => {
		let conf = this.#Config.get_('mobs')
		let stringcss = '.mobdiv {position: relative;border-radius: 50%;display: flex;justify-content: center;align-items: center;width: ' + conf.divs.range.size.x + 'px;height: ' + conf.divs.range.size.y + 'px;transition: transform 1s ease;}'
		stringcss += '.range {position: absolute;display: flex;justify-content: center;align-items: flex-end;border-radius: 50%;background-color: ' + conf.divs.range.backgroundColor + ';width: ' + conf.divs.range.size.x + 'px;height: ' + conf.divs.range.size.y + 'px;}'
		stringcss += '.dir {position: absolute;border-radius: 50%;background-color: ' + conf.divs.dir.backgroundColor + ';width: ' + conf.divs.dir.size.x + 'px;height: ' + conf.divs.dir.size.y + 'px;}'
		stringcss += '.ico {position: absolute;border-radius: 50%;background-color: ' + conf.divs.ico.backgroundColor + ';width: ' + conf.divs.ico.size.x + 'px;height: ' + conf.divs.ico.size.y + 'px;}'
		this.#addCss(stringcss, 'mobs')
	}

	#addCss(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	// -------------------------------------------------------------

	get_allMobs() {
		if (this.#Mobs.length < 1) {
			console.log('no mobs found')
			return false;
		}
		else {
			return this.#Mobs;
		}
	}
}
