export function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // d.toFixed(2); //to fixed returns only 2 decimal places.
}

export function distanceAsString(distanceKm: number) {
  if (distanceKm < 1) {
    return `${(distanceKm * 1000).toFixed(0)} m`;
  } else {
    return `${distanceKm.toFixed(1)} km`;
  }
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function getWalkingTime(distanceKm: number, speedKmh = 4) {
  const totalTimeInHours = distanceKm / speedKmh;

  const days = Math.floor(totalTimeInHours / 24);
  const hours = Math.floor(totalTimeInHours % 24);
  const minutes = Math.round((totalTimeInHours - Math.floor(totalTimeInHours)) * 60);

  let timeString = '';
  if (days > 0) timeString += `${days}d `;
  if (hours > 0) timeString += `${hours}h `;
  if (minutes > 0) timeString += `${minutes}min`;

  return timeString.trim() || '0min'; // Return '0min' if no time is calculated
}
