class Dom {
	#Config

	#Body;
	#GameDiv

	constructor(Config) {
		this.#Config = Config
		this.#init_()
	}

	#init_() {
		this.#Body = document.body
		this.#init_GameDiv()
	}

	#init_GameDiv() {
		this.#GameDiv = document.createElement('div')
		this.#GameDiv.id = this.#Config.get_('dom').gameDivId
		this.#GameDiv.className = this.#Config.get_('dom').className
		this.#add_ToTargetDomElem(this.#GameDiv, this.#Body)
		this.#cssMaker()
	}

	add_AllMobsToDom(Mobs) {
		if (typeof Mobs === 'object') {
			Mobs.forEach(mob => {
				this.#add_OneMobToDom(mob)
				this.#add_ToTargetDomElem(mob.mobdiv, this.#GameDiv)
			});
		}
	}

	#add_OneMobToDom(mob) {
		let conf = mob.get_conf()
		for (var key in conf.divs) {
			if (conf.divs.hasOwnProperty(key)) {

				let targetConf = conf.divs[key];

				if (!targetConf.parent) mob[targetConf.className].id = conf.id
				if (targetConf.parent) mob[targetConf.parent].appendChild(mob[targetConf.className])


				mob[targetConf.className].className = targetConf.className
				if (!targetConf.parent) mob[targetConf.className].setAttribute('data-name', conf.name)

			}
		}
	}
	#add_ToTargetDomElem(element, target = false) {
		if (target) { target.appendChild(element); }
		else { console.warn('appenchild impossible') }
	}

	// -------------------------------------------------------------
	#cssMaker = () => {
		let stringcss = this.#get_localCss()
		this.#addCss(stringcss, 'mobs')
	}

	#addCss(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	#get_localCss() {
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
