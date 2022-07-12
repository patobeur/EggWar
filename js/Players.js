class Players {
	#Players;
	#CurrentRoomId = 0;
	#CurrentPlayerImmat;
	#Config;
	#Formula;
	constructor(Config) {
		this.#Config = Config
		this.#Formula = new Formula()
		this.#CurrentPlayerImmat = 0
		// this.#cssMaker()
	}
	addOnePlayer(name = false) {
		// set a fresh conf
		let conf = { ... this.#Config.get_('players') }
		conf.name = name ?? this.#Formula.get_aleaEntreBornes(1, 99999)
		conf.position = this.#Formula.get_aleaPosOnScreen(conf.divs.mobdiv.size)
		conf.id = 'Mob_' + this.#CurrentPlayerImmat

		let newPlayer = { conf: conf }
		this.#set_PlayerDivs(newPlayer)
		this.#addToPlayersArray(newPlayer)
	}
	update() {
		for (let index = 0; index < this.#Players.length; index++) {

			// this.#Players[index].mobIa.iaAction(this.#Players[index])

		}
	}
	#addToPlayersArray(newPlayer) {
		this.#Players.push(newPlayer)
		this.#CurrentPlayerImmat = this.#Players.length
	}
	// -------------------------------------------------------------
	#set_PlayerDivs(newPlayer) {
		newPlayer.mobdiv = document.createElement('div')
		newPlayer.range = document.createElement('div')
		newPlayer.dir = document.createElement('div')
		newPlayer.ico = document.createElement('div')
	}
	#cssMaker = () => {
		let conf = this.#Config.get_('players')
		let stringcss = '.mobdiv {position: absolute;display:flex;background-color: ' + conf.backgroundColor + ';width: ' + conf.size.x + 'px;height: ' + conf.size.y + 'px;}'
		stringcss += '.range {position: relative;border-radius:50%;background-color: ' + conf.rangeBackgroundColor + ';width: ' + conf.rangeSize.x + 'px;height: ' + conf.rangeSize.y + 'px;}'
		this.#addCss(stringcss, 'players')
	}
	#addCss(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	// -------------------------------------------------------------
	get_allPlayers() {
		return this.#Players
	}
}
