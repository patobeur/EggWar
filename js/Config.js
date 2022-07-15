class Config {
	#Config
	constructor() {
		this.#Config = this.#get_config()
	}
	get_(parent, value = false) {
		let confParent = this.#Config[parent] ?? false;
		let confValue = confParent[value] ? confParent[value] : confParent ? confParent : false;
		return { ...confValue }
	}
	#get_config() {
		return {
			dom: {
				gameDivId: 'Game',
				className: 'radientbg'
			},
			mobs: {
				lv: 0,
				speed: 1,
				theta: {
					cur: 0,
					min: 0,
					max: 360
				},
				ia: {
					// can change mind every x milisec
					changeAction: {
						cur: 0,
						min: 0,
						max: 30,
						choice: 0,
						lastAction: 0
					},
					dirAmplitude: 22.5
				},
				divs: {
					mobdiv: {
						className: 'mobdiv',
						size: { x: 2, y: 2, z: 2 },
						backgroundColor: 'yellow'
					},
					range: {
						className: 'range',
						size: { x: 80, y: 80, z: 80 },
						backgroundColor: 'rgba(255, 255, 255, .95)',
						parent: 'mobdiv'
					},
					dir: {
						className: 'dir',
						size: { x: 8, y: 3, z: 4 },
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						parent: 'range'
					},
					ico: {
						className: 'ico',
						size: { x: 30, y: 30, z: 30 },
						backgroundColor: 'rgba(255,220,150,1)',
						parent: 'mobdiv'
					},
					info: {
						className: 'info',
						size: { x: 40, y: 20, z: 40 },
						backgroundColor: 'rgba(255,255,255,.5)',
						parent: 'mobdiv'
					}
				},
			},
			Animate: {
				interval: 50
			}
		}
	}
}
