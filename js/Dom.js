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
		let conf = mob.conf
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
		if (target) target.appendChild(element);
		else console.warn('appenchild impossible')
	}
}
