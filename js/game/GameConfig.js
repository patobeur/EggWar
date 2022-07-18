class GameConfig {
	#GameConfig
	constructor() {
		this.#GameConfig = this.#get_config()
	}
	get_(parent, value = false) {
		let confParent = this.#GameConfig[parent] ?? false;
		let confValue = confParent[value] ? confParent[value] : confParent ? confParent : false;
		return { ...confValue }
	}
	#get_config() {
		const config = {
			dom: {
				gameDivId: 'Game',
				className: 'radientbg'
			},
			Render: {
				interval: 50
			}
		}
		return { ...config }
	}
}
