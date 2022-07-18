class Players {
	#AllPlayers = [];
	#CurrentRoomId = 0;
	#CurrentPlayerImmat;
	#Formula;
	constructor() {
		this.#Formula = new Formula()
		this.#AllPlayers = []
		this.#CurrentPlayerImmat = 0
		// this.#cssMaker()
	}
	addOne(nickname = false, playerType = 'players') {

		// i get a clone of the default config
		this.playerConfig = new PlayerConfig()

		// i get a clone with the default config
		let conf = this.playerConfig.get_(playerType)

		// create player
		let newPlayer = {}

		// adding basics to feet the needs
		conf.immat = this.#CurrentPlayerImmat++
		conf.nickname = nickname ?? this.#Formula.rand(1, 99999)
		conf.position = this.#Formula.get_aleaPosOnScreen(conf.divs.prima.size)
		conf.id = 'P_' + conf.immat
		conf.room.id = this.#CurrentRoomId

		// add basics to player
		newPlayer = { conf: conf }


		// adding iaMob to player but this is just for testing
		// need more info for the rest !!
		// keyboard controller needed
		newPlayer.ia = new MobsIa()

		newPlayer.update = () => {

			for (let index = 0; index < this.#AllPlayers.length; index++) {

				this.#AllPlayers[index].ia.iaAction(this.#AllPlayers[index].conf)
				this.#refresh_Div(this.#AllPlayers[index])
			}

		}
		newPlayer.set_divAttrib = (target, value = false, attribute = false, attribute2 = false) => {

			if (newPlayer.divs[target] && value) {
				if (attribute && attribute2) {
					newPlayer.divs[target][attribute][attribute2] = value
				}
				else if (attribute && !attribute2) {
					newPlayer.divs[target][attribute] = value
				}
			}
		}
		// add some divs to player
		this.#set_PlayerDivs(newPlayer)

		// push a fresh mob with fresh conf to allMob arrray
		this.#AllPlayers.push(newPlayer)

		// set the new immat
		this.#CurrentPlayerImmat = this.#AllPlayers.length
	}
	#refresh_Div(player) {

		player.set_divAttrib('range', 'rotate(' + player.conf.theta.cur + 'deg)', 'style', 'transform')
		player.set_divAttrib('ico', player.conf.theta.cur + '°', 'textContent', false)
		player.set_divAttrib('prima', (player.conf.position.y - (player.conf.divs.prima.size.y / 2)) + 'px', 'style', 'top')
		player.set_divAttrib('prima', (player.conf.position.x - (player.conf.divs.prima.size.x / 2)) + 'px', 'style', 'left')
		player.set_divAttrib('prima', 'toto', 'data-nickname', false)
	}

	#set_PlayerDivs(newPlayer) {
		newPlayer.divs = {}
		for (var div in newPlayer.conf.divs) {
			newPlayer.divs[div] = document.createElement('div')
		};
	}
	// -------------------------------------------------------------
	get_allPlayers() {
		return this.#AllPlayers
	}
}
