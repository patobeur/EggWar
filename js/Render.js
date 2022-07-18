class Render {
	#GameConfig

	#AllMobs
	#AllPlayers

	#interval
	#Render

	// dom
	#MobConfig
	#Body;
	#GameDiv
	constructor(GameConfig, AllMobs, AllPlayers) {
		this.#GameConfig = GameConfig
		this.#AllMobs = AllMobs
		this.#AllPlayers = AllPlayers

		this.#MobConfig = new MobConfig()

		this.#init_Dom()
		this.#init_()
	}
	#init_ = () => {
		this.#interval = this.#GameConfig.get_('Render').interval
	}
	#render = () => {

		if (this.#AllMobs.length > 0) {
			this.#AllMobs.forEach(mob => {
				mob.update()
			});
		}
		if (this.#AllPlayers.length > 0) {
			this.#AllPlayers.forEach(player => {
				player.update()
			});
		}
	}
	start_Render() {
		this.#Render = setInterval(this.#render, this.#interval)
	}
	stop_Render() {
		clearInterval(this.#Render);
	}


	// -------------------------------------------------------------
	#init_Dom = () => {
		this.#Body = document.body
		this.#init_GameDiv()
		this.add_AllMobsToDom(this.#AllMobs)

		this.add_AllPlayerToDom(this.#AllPlayers)

		console.log('added mobs:', this.#AllMobs)
		console.log('waiting players:', this.#AllPlayers)
	}
	#cssMaker = () => {
		// mobs css
		let mobsCss = this.#get_MobsCss()
		this.#addCssToDom(mobsCss, 'mobs')
	}

	#init_GameDiv() {
		this.#GameDiv = document.createElement('div')
		this.#GameDiv.id = this.#GameConfig.get_('dom').gameDivId
		this.#GameDiv.className = this.#GameConfig.get_('dom').className
		this.#add_ToTargetDomElem(this.#GameDiv, this.#Body)

		this.#cssMaker()
	}
	#add_ToTargetDomElem(element, target = false) {
		if (target && element) { target.appendChild(element); }
		else { console.warn('appenchild impossible') }
	}
	#set_MobDivs(mob) {
		let mobConf = mob.get_conf()

		// get all div in this mobConf
		for (var key in mobConf.divs) {
			if (mobConf.divs.hasOwnProperty(key)) {

				let parentdiv = !mobConf.divs[key].parentDivName === false
					? mob.get_div(mobConf.divs[key].parentDivName)
					: false

				// append in parent div if any
				if (parentdiv) parentdiv.appendChild(mob.get_div(key))

				mob.set_divAttrib(key, mobConf.divs[key].className, 'className', false)

			}
		}
		mob.set_divAttrib('info', '*' + mobConf.nickname, 'textContent', false)

		mob.set_divAttrib('prima', mobConf.id, 'id', false)
		mob.set_divAttrib('prima', mobConf.nickname, 'data-nickname', false)
		mob.set_divAttrib('prima', mobConf.position.x + 'px', 'style', 'left')
		mob.set_divAttrib('prima', mobConf.position.y + 'px', 'style', 'top')
		// mob.set_divAttrib('range', mobConf.position.y + 'px', 'style', 'top')

	}
	#set_PlayerDivs(player) {
		let playerConf = player.conf

		// get all div in this playerConf
		for (var key in playerConf.divs) {
			if (playerConf.divs.hasOwnProperty(key)) {
				let parentdiv = !playerConf.divs[key].parentDivName === false
					? player.divs[key].parentDivName
					: false

				// append in parent div if any
				if (parentdiv) parentdiv.appendChild(player[key])

				player.set_divAttrib(player, key, playerConf.divs[key].className, 'className', false)

			}
		}
		player.set_divAttrib(player, 'info', '*' + playerConf.nickname, 'textContent', false)

		player.set_divAttrib(player, 'prima', playerConf.id, 'id', false)
		player.set_divAttrib(player, 'prima', playerConf.nickname, 'data-nickname', false)
		player.set_divAttrib(player, 'prima', playerConf.position.x + 'px', 'style', 'left')
		player.set_divAttrib(player, 'prima', playerConf.position.y + 'px', 'style', 'top')

	}
	#addCssToDom(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	#get_MobsCss() {
		let conf = this.#MobConfig.get_('mobs')

		let stringcss = '.prima {position: relative;border-radius: 50%;display: flex;justify-content: center;align-items: center;width: ' + conf.divs.range.size.x + 'px;height: ' + conf.divs.range.size.y + 'px;}'
		stringcss += '.range {position: absolute;display: flex;justify-content: center;align-items: flex-end;border-radius: 50%;background-color: ' + conf.divs.range.backgroundColor + ';width: ' + conf.divs.range.size.x + 'px;height: ' + conf.divs.range.size.y + 'px;transition: transform 1s ease;}'
		stringcss += '.dir {position: absolute;border-radius: 50%;background-color: ' + conf.divs.dir.backgroundColor + ';width: ' + conf.divs.dir.size.x + 'px;height: ' + conf.divs.dir.size.y + 'px;}'
		stringcss += '.ico {position: absolute;border-radius: 50%;text-align:center;background-color: ' + conf.divs.ico.backgroundColor + ';width: ' + conf.divs.ico.size.x + 'px;height: ' + conf.divs.ico.size.y + 'px;box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);}'
		stringcss += '.info {color:white;position: absolute;top:60%;text-align:center;border-radius: .2rem;padding:0 .5rem;background-color: ' + conf.divs.info.backgroundColor + ';width:max-content;height: ' + conf.divs.info.size.y + 'px;box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);}'

		return stringcss
	}
	add_AllMobsToDom(Mobs) {
		if (typeof Mobs === 'object') {
			Mobs.forEach(mob => {
				this.#set_MobDivs(mob)

				let mobPrimaDiv = mob.get_div('prima')
				this.#add_ToTargetDomElem(mobPrimaDiv, this.#GameDiv)
			});
		}
	}
	add_AllPlayerToDom(Players) {
		if (typeof Players === 'object') {
			Players.forEach(player => {
				this.#set_PlayerDivs(player)

				let playerPrimaDiv = player.divs.prima
				this.#add_ToTargetDomElem(playerPrimaDiv, this.#GameDiv)
			});
		}
	}
	// ------------------------------------------------

}
