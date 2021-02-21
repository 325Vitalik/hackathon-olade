const earthRadius = 6371; // Radius of the earth in km
export const compareCoordinatesService = {
	isInRadius(coordFirst, coordSecond, radius) {
		const distance = this.compareCoordinates(coordFirst, coordSecond);
		return distance <= radius * 2;
	},

	compareCoordinates(coordFirst, coordSecond) {
		const dLat = deg2rad(coordSecond.lat - coordFirst.lat);
		const dLon = deg2rad(coordSecond.lng - coordFirst.lng);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(coordFirst.lat)) * Math.cos(deg2rad(coordSecond.lat)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return earthRadius * c * 1000; // Distance in km
	},
};

const deg2rad = deg => {
	return deg * (Math.PI / 180);
};