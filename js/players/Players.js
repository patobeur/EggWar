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
	addOnePlayer(nickname = false) {

		// i get a clone of the default config
		let conf = new PlayerConfig()
		let newPlayer = { conf: conf.get_('players') }

		newPlayer.conf.immat = this.#CurrentPlayerImmat++
		newPlayer.conf.nickname = nickname ?? this.#Formula.rand(1, 99999)
		newPlayer.conf.position = this.#Formula.get_aleaPosOnScreen(newPlayer.conf.divs.prima.size)
		newPlayer.conf.id = 'P_' + newPlayer.conf.immat
		newPlayer.conf.room.id = this.#CurrentRoomId

		this.#set_PlayerDivs(newPlayer)
		this.#AllPlayers.push(newPlayer)

	}
	update() {
		// for (let index = 0; index < this.#AllPlayers.length; index++) {
		// }
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
