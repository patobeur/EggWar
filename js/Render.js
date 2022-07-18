class Render {
	#GameConfig
	#Formula

	#AllMobs
	#AllPlayers

	#interval
	#Render

	// dom
	#MobConfig
	#PlayerConfig
	#Body;
	#GameDiv
	constructor(AllMobs, AllPlayers) {
		this.#MobConfig = new MobConfig()
		this.#PlayerConfig = new PlayerConfig()

		this.#GameConfig = new GameConfig()

		this.#Formula = new Formula()
		this.#AllMobs = AllMobs
		this.#AllPlayers = AllPlayers

		this.#init_Dom()
		this.#init_Render()
	}
	#init_Render = () => {
		this.#interval = this.#GameConfig.get_('Render').interval
	}
	#render = () => {
		if (this.#AllMobs.length > 0) this.#AllMobs.forEach(mob => mob.update());
		if (this.#AllPlayers.length > 0) this.#AllPlayers.forEach(player => player.update());
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

		this.add_AllItemsToDom(this.#AllMobs)
		this.add_AllItemsToDom(this.#AllPlayers)

		console.log('added mobs:', this.#AllMobs)
		console.log('added players:', this.#AllPlayers)
	}
	#cssMaker = () => {
		// mobs css
		let mobsCss = this.#get_ItemsCss(this.#MobConfig.config.mobs)
		this.#addCssToDom(mobsCss, 'mobsCss')
		// player css
		let playerCss = this.#get_ItemsCss(this.#PlayerConfig.config.players)
		this.#addCssToDom(playerCss, 'playersCss')
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
	#set_Divs(item) {

		// get all div in this itemConf
		for (var key in item.conf.divs) {
			if (item.conf.divs.hasOwnProperty(key)) {

				// define parent if any
				let parentname = item.conf.divs[key].parentDivName
				let parentdiv = !parentname === false
					? item.divs[parentname]
					: false

				// append in parent div if any
				if (parentdiv) parentdiv.appendChild(item.divs[key])

				this.#set_divAttrib(item, key, item.conf.divs[key].className, 'className', false)
			}
		}
		this.#set_divAttrib(item, 'info', item.conf.nickname, 'textContent', false)
		this.#set_divAttrib(item, 'prima', item.conf.id, 'id', false)
		this.#set_divAttrib(item, 'prima', item.conf.nickname, 'data-nickname', false)
		this.#set_divAttrib(item, 'prima', item.conf.position.x + 'px', 'style', 'left')
		this.#set_divAttrib(item, 'prima', item.conf.position.y + 'px', 'style', 'top')
		this.#set_divAttrib(item, 'prima', item.conf.faction + ' prima', 'className', false)
	}
	#addCssToDom(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	#get_ItemsCss(conf) {
		let stringcss = this.#cssmaker(conf)

		// let stringcss = '.' + conf.faction + '.prima {position: relative;border-radius: 50%;display: flex;justify-content: center;align-items: center;width: ' + conf.divs.prima.size.x + 'px;height: ' + conf.divs.prima.size.y + 'px;}'
		// stringcss += '.' + conf.faction + ' .range {position: absolute;display: flex;justify-content: center;align-items: flex-end;border-radius: 50%;background-color: ' + conf.divs.range.backgroundColor + ';width: ' + conf.divs.range.size.x + 'px;height: ' + conf.divs.range.size.y + 'px;transition: transform 1s ease;}'
		// stringcss += '.' + conf.faction + ' .dir {position: absolute;border-radius: 50%;background-color: ' + conf.divs.dir.backgroundColor + ';width: ' + conf.divs.dir.size.x + 'px;height: ' + conf.divs.dir.size.y + 'px;}'
		// stringcss += '.' + conf.faction + ' .ico {position: absolute;border-radius: 50%;text-align:center;background-color: ' + conf.divs.ico.backgroundColor + ';width: ' + conf.divs.ico.size.x + 'px;height: ' + conf.divs.ico.size.y + 'px;box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);}'
		// stringcss += '.' + conf.faction + ' .info {color:white;position: absolute;top:60%;text-align:center;border-radius: .2rem;padding:0 .5rem;background-color: ' + conf.divs.info.backgroundColor + ';width:max-content;box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);}'//height: ' + conf.divs.info.size.y + 'px;
		return stringcss
	}
	add_AllItemsToDom(Items) {
		if (typeof Items === 'object') {
			Items.forEach(item => {
				this.#set_Divs(item)

				let primaDiv = item.divs.prima
				this.#add_ToTargetDomElem(primaDiv, this.#GameDiv)
			});
		}
	}
	// ------------------------------------------------
	#set_divAttrib = (element, target, value = false, attribute = false, attribute2 = false) => {
		if (element.divs[target] && value) {
			if (attribute && attribute2) {
				element.divs[target][attribute][attribute2] = value
			}
			else if (attribute && !attribute2) {
				element.divs[target][attribute] = value
			}
		}
	}
	#cssmaker = (conf) => {
		let cssString = '';
		for (var key in conf.divs) {
			if (conf.divs.hasOwnProperty(key)) {
				let div = conf.divs[key]
				cssString += '.' + conf.faction + (key === 'prima' ? '' : ' ') + '.' + key
				cssString += '{'
				if (div.display) cssString += 'display:' + div.display + ';'
				if (div.position) cssString += 'position:' + div.position + ';'
				if (div.transition) cssString += 'transition:' + div.transition + ';'
				if (div.alignItems) cssString += 'align-items:' + div.alignItems + ';'
				if (div.justifyContent) cssString += 'justify-content:' + div.justifyContent + ';'
				if (div.backgroundColor) cssString += 'background-color:' + div.backgroundColor + ';'
				if (div.borderRadius) cssString += 'border-radius:' + div.borderRadius + ';'
				if (div.textAlign) cssString += 'text-align:' + div.textAlign + ';'
				if (div.boxShadow) cssString += 'box-shadow:' + div.boxShadow + ';'
				if (div.color) cssString += 'color:' + div.color + ';'
				if (div.top) cssString += 'top:' + div.top + ';'
				if (div.padding) cssString += 'padding:' + div.padding + ';'
				if (div.width) {
					cssString += 'width:' + div.width
				} else {
					if (div.size.x) cssString += 'width:' + div.size.x + (typeof div.size.x === 'number' ? 'px' : '') + ';'
					if (div.size.y) cssString += 'height:' + div.size.y + (typeof div.size.y === 'number' ? 'px' : '') + ';'

				}
				cssString += '}'
			}

		}
		return cssString

	}
}
