class Formula {
	constructor() {
	}
	get_NextPos = (x, y, tetha, speed) => {

		tetha = this.degToRad(tetha)

		let neo = {
			x: x - Math.sin(tetha) * speed,
			y: y + Math.cos(tetha) * speed
		}
		neo.x = Math.round(neo.x * 10) / 10;
		neo.y = Math.round(neo.y * 10) / 10;

		return neo
	}
	get_aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}
	get_aleaPosOnScreen(size) {
		let maxX = window.innerWidth;
		let maxY = window.innerHeight;
		// console.log(maxX, maxY)
		let pos = {
			x: this.get_aleaEntreBornes(0, maxX - (size.x / 2)),
			y: this.get_aleaEntreBornes(0, maxY - (size.y / 2)),
			z: this.get_aleaEntreBornes(-1, 1)
		}
		// console.log(size, pos)
		return pos
	}
	degToRad(deg) {
		var pi = Math.PI;
		return deg * (pi / 180);
	}
	radToDeg(rad) {
		var pi = Math.PI;
		return rad * (180 / pi);
	}

	// get_NextOrbit2D(x, y, tetha) {
	// 	tetha = this.degToRad(tetha)
	// 	return {
	// 		x: (x * Math.cos(tetha)) - (y * Math.sin(tetha)),
	// 		y: (x * Math.sin(tetha)) + (y * Math.cos(tetha))
	// 	}
	// }
	// get_Distance2D = (from, destination) => {
	// 	let AB = (destination.x) - (from.x)
	// 	let AC = (destination.y) - (from.y)
	// 	let distance = Math.sqrt((AB * AB) + (AC * AC))
	// 	return distance
	// }

}
