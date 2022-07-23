class Formula {
	constructor() {
	}
	get_NextHtmlPos = (x, y, tetha, speed) => {
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
	get_NextThreePos = (x, y, theta, speed) => {
		return {
			x: x - Math.sin(theta) * speed,
			y: y + Math.cos(theta) * speed
		}
	}
	getDistanceXYZ = (A, B) => {
		{
			if (!B) { B = { position: { x: 0, y: 0, z: 0 } } }
			let AB = (B.position.x) - (A.position.x)
			let AC = (B.position.y) - (A.position.y)
			let BC = (B.position.z) - (A.position.z)
			let distance = Math.floor(Math.sqrt((AB * AB) + (AC * AC) + (BC * BC)))
			// console.log("distanceXYZ:", distance);
			return distance
		}
	}


	rand = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) }
	degToRad = (deg) => { return deg * (Math.PI / 180); }
	radToDeg = (rad) => { return rad * (180 / Math.PI); }

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
	get_NextOrbitPosXYZ2 = (obj, centerObj = false) => {

		if (centerObj === false) { centerObj = { position: { x: 0, y: 0, z: 0 } } }
		let distance = obj.centerDistance
		// let distance = Formula3D.getDistanceXYZ(obj, centerObj)

		// console.log('distance', distance)
		if (obj.theta[0] > obj.theta[1]) {
			obj.theta[0] = obj.theta[0] - obj.theta[1]
		}
		// if (obj.theta && centerObj) {
		// 	// sun pos
		let centerX = 0;
		let centerY = 0;
		let centerZ = 0;
		let centerW = .1;
		let centerH = .1;
		let centerD = .1;
		// 	// new pos
		let x2 = 0
		let y2 = 0
		let z2 = 0
		// 	if (obj.objtype === 'player') {
		// 	}
		if (distance > 0) {
			// console.log('player check orbital force')
			x2 = centerX + ((distance) * (Math.cos(obj.theta.x[0])));
			y2 = centerY + ((distance) * (Math.sin(obj.theta.y[0])));
			z2 = centerZ + ((distance) * (Math.cos(obj.theta.z[0])));
		}
		else {
			x2 = centerX + (centerW * (Math.cos(obj.theta.x[0])));
			y2 = centerY + (centerH * (Math.sin(obj.theta.y[0])));
			z2 = centerZ + (centerD * (Math.sin(obj.theta.z[0])));
		}
		// console.log(obj)
		// 	// saving new pos in obj
		// 	if (obj.orbitdir && obj.orbitdir > 0) {
		if (obj.theta.x[2] > 0) {
			obj.position.x = x2// - (obj.geometry.parameters.width / 2)
			obj.theta.x[0] = obj.theta.x[0] + obj.theta.x[2];
			// obj.rotation.x = THREE.Math.degToRad(obj.theta.x[0])
		}
		if (obj.theta.y[2] > 0) {
			obj.position.y = y2// - (obj.geometry.parameters.height / 2)
			obj.theta.y[0] = obj.theta.y[0] + obj.theta.y[2];
			// obj.rotation.y = THREE.Math.degToRad(obj.theta.y[0])
		}
		if (obj.theta.z[2] > 0) {
			obj.position.z = z2// - (obj.geometry.parameters.depth/ 2)
			obj.theta.z[0] = obj.theta.z[0] + obj.theta.z[2];
			// obj.rotation.z = THREE.Math.degToRad(obj.theta.z[0])
		}
		if (obj.target) {
			obj.target.position.set(0, 0, 0);
		}
		// 	}
		// 	else {
		// 		obj.theta[0] = obj.theta[0] - obj.theta[2]
		// 	}
	}

	get_CartesianFromLatLngDist = (pt) => {
		let lat = (90 - pt.lat) * Math.PI / 180
		let lng = (180 + pt.lng) * Math.PI / 180
		// let x = pt.alt + (Math.sin(lat) * Math.cos(lng))
		// let y = pt.alt + (-Math.sin(lat) * Math.sin(lng))
		// let z = pt.alt + (-Math.cos(lat))
		let x = pt.alt + (Math.sin(lat) * Math.cos(lng));
		let y = pt.alt + (Math.sin(lat) * Math.sin(lng));
		let z = pt.alt + Math.cos(lat);
		let retour = new THREE.Vector3(x, y, z);
		return retour
	}
}
function get_DegreeWithTwoPos(fromX, fromY, destX, destY,) {
	var nextY = fromY - destY;
	var nextX = fromX - destX;
	var theta = Math.atan2(nextX, nextY); // 0° = east
	theta = (theta * 180 / Math.PI); // radians to degrees
	// if (theta < 0) {
	// 	theta += 360; // negative case
	// }
	// console.log(
	// 	theta
	// )
	return theta;
}
