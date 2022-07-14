class Mobs {
	#AllMobs;
	#CurrentMobImmat;
	#Config;

	constructor(Config) {
		this.#Config = Config
		this.#AllMobs = []
		this.#CurrentMobImmat = 0
		this.#cssMaker()
	}

	addOne(name = false) {
		let newmob = new Mob(
			name,
			this.#Config,
			this.#CurrentMobImmat
		)

		this.#AllMobs.push(newmob)
	}

	// -------------------------------------------------------------

	#cssMaker = () => {
		let stringcss = this.get_localCss()
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
		return this.#AllMobs.length > 0 ? this.#AllMobs : false;
	}
	get_localCss() {
		let conf = this.#Config.get_('mobs')
		// console.log(conf)
		let stringcss = '.mobdiv {position: relative;border-radius: 50%;display: flex;justify-content: center;align-items: center;width: ' + conf.divs.range.size.x + 'px;height: ' + conf.divs.range.size.y + 'px;transition: transform 1s ease;}'
		stringcss += '.range {position: absolute;display: flex;justify-content: center;align-items: flex-end;border-radius: 50%;background-color: ' + conf.divs.range.backgroundColor + ';width: ' + conf.divs.range.size.x + 'px;height: ' + conf.divs.range.size.y + 'px;}'
		stringcss += '.dir {position: absolute;border-radius: 50%;background-color: ' + conf.divs.dir.backgroundColor + ';width: ' + conf.divs.dir.size.x + 'px;height: ' + conf.divs.dir.size.y + 'px;}'
		stringcss += '.ico {position: absolute;border-radius: 50%;background-color: ' + conf.divs.ico.backgroundColor + ';width: ' + conf.divs.ico.size.x + 'px;height: ' + conf.divs.ico.size.y + 'px;box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);}'
		stringcss += ''
		return stringcss
	}
}
