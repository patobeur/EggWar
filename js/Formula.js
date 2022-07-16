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

		neo = {
			x: neo.x > window.innerWidth
				? neo.x - window.innerWidth
				: neo.x < 0
					? window.innerWidth - neo.x
					: neo.x,
			y: neo.y > window.innerHeight
				? neo.y - window.innerHeight
				: neo.y < 0
					? window.innerHeight - neo.y
					: neo.y
		}

		return neo
	}

	rand = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) }

	get_aleaPosOnScreen(size) {

		let maxX = window.innerWidth;
		let maxY = window.innerHeight;

		let pos = {
			x: this.rand(0, maxX - (size.x / 2)),
			y: this.rand(0, maxY - (size.y / 2)),
			z: this.rand(-1, 1)
		}
		// console.log(size, pos)
		return pos
	}

	degToRad = (deg) => { return deg * (Math.PI / 180); }

	radToDeg = (rad) => { return rad * (180 / Math.PI); }

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
