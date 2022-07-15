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
						divName: 'mobdiv',
						className: 'mobdiv',
						size: { x: 2, y: 2, z: 2 },
						backgroundColor: 'yellow',
						parentDivName: false
					},
					range: {
						divName: 'range',
						className: 'range',
						size: { x: 80, y: 80, z: 80 },
						backgroundColor: 'rgba(255, 255, 255, .95)',
						parentDivName: 'mobdiv'
					},
					dir: {
						divName: 'dir',
						className: 'dir',
						size: { x: 10, y: 8, z: 4 },
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						parentDivName: 'range'
					},
					ico: {
						divName: 'ico',
						className: 'ico',
						size: { x: 30, y: 30, z: 30 },
						backgroundColor: 'rgba(255,220,150,1)',
						parentDivName: 'mobdiv'
					},
					info: {
						divName: 'info',
						className: 'info',
						size: { x: 40, y: 20, z: 40 },
						backgroundColor: 'rgba(150,150,255,.8)',
						parentDivName: 'mobdiv'
					}
				},
			},
			Animate: {
				interval: 50
			}
		}
	}
}
