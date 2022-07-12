class Dom {
	#Config

	#Body; #GameDiv

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
		let mobConfDivs = mob.conf.divs
		for (var key in mobConfDivs) {
			if (mobConfDivs.hasOwnProperty(key)) {

				let targetConf = mobConfDivs[key];

				if (!targetConf.parent) mob[targetConf.className].id = mob.conf.id
				if (targetConf.parent) mob[targetConf.parent].appendChild(mob[targetConf.className])


				mob[targetConf.className].className = targetConf.className
				mob[targetConf.className].setAttribute('data-name', mob.conf.name)

			}
		}
	}

	#add_ToTargetDomElem(element, target = false) {
		if (target) target.appendChild(element);
		else console.warn('appenchild impossible')
	}
}
