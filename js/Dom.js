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
				this.#add_ToTargetDomElem(mob.get_div('mobdiv'), this.#GameDiv)
			});
		}
	}

	#add_OneMobToDom(mob) {
		let mobConf = mob.get_conf()

		// get all div in this mobConf
		for (var key in mobConf.divs) {
			if (mobConf.divs.hasOwnProperty(key)) {

				let parentdiv = mobConf.divs[key].parentDivName
					? mob.get_div(mobConf.divs[key].parentDivName)
					: false

				if (parentdiv) parentdiv.appendChild(mob.get_div(key))
				if (!parentdiv) mob.set_div(key, mobConf.id, 'id', false)
				if (!parentdiv) mob.set_div(key, mobConf.name, 'data-name', false)

				if (key === 'info') mob.set_div(key, mobConf.name, 'textContent', false)

				mob.set_div(key, mobConf.divs[key].className, 'className', false)

			}
		}
	}
	#add_ToTargetDomElem(element, target = false) {
		if (target && element) { target.appendChild(element); }
		else { console.warn('appenchild impossible') }
	}

	// -------------------------------------------------------------
	#cssMaker = () => {
		let stringcss = this.#get_localCss()
		this.#addCssToDom(stringcss, 'mobs')
	}

	#addCssToDom(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	#get_localCss() {
		let conf = this.#Config.get_('mobs')

		let stringcss = '.mobdiv {position: relative;border-radius: 50%;display: flex;justify-content: center;align-items: center;width: ' + conf.divs.range.size.x + 'px;height: ' + conf.divs.range.size.y + 'px;}'
		stringcss += '.range {position: absolute;display: flex;justify-content: center;align-items: flex-end;border-radius: 50%;background-color: ' + conf.divs.range.backgroundColor + ';width: ' + conf.divs.range.size.x + 'px;height: ' + conf.divs.range.size.y + 'px;transition: transform 1s ease;}'
		stringcss += '.dir {position: absolute;border-radius: 50%;background-color: ' + conf.divs.dir.backgroundColor + ';width: ' + conf.divs.dir.size.x + 'px;height: ' + conf.divs.dir.size.y + 'px;}'
		stringcss += '.ico {position: absolute;border-radius: 50%;text-align:center;background-color: ' + conf.divs.ico.backgroundColor + ';width: ' + conf.divs.ico.size.x + 'px;height: ' + conf.divs.ico.size.y + 'px;box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);}'
		stringcss += '.info {color:white;position: absolute;top:60%;text-align:center;border-radius: .2rem;padding:0 .5rem;background-color: ' + conf.divs.info.backgroundColor + ';width:max-content;height: ' + conf.divs.info.size.y + 'px;box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);}'

		return stringcss
	}

}
