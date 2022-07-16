class Players {
	#AllPlayers = [];
	#CurrentRoomId = 0;
	#CurrentPlayerImmat;
	#Config;
	#Formula;
	constructor(Config) {
		this.#Config = Config
		this.#Formula = new Formula()
		this.#AllPlayers = []
		this.#CurrentPlayerImmat = 0
		// this.#cssMaker()
	}
	addOnePlayer(nickname = false) {
		// set a fresh conf
		let conf = this.#Config.get_('players')
		let newPlayer = { conf: conf }

		newPlayer.conf.immat = this.#CurrentPlayerImmat++
		newPlayer.conf.nickname = nickname ?? this.#Formula.rand(1, 99999)
		newPlayer.conf.position = this.#Formula.get_aleaPosOnScreen(newPlayer.conf.divs.prima.size)
		newPlayer.conf.id = 'P_' + newPlayer.conf.immat
		newPlayer.conf.room.id = this.#CurrentRoomId

		this.#set_PlayerDivs(newPlayer)
		this.#addToPlayersArray(newPlayer)

	}
	update() {
		// for (let index = 0; index < this.#AllPlayers.length; index++) {
		// }
	}
	#addToPlayersArray(newPlayer) {
		this.#AllPlayers.push(newPlayer)
	}
	// -------------------------------------------------------------
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
