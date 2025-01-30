export function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLng = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d.toFixed(2); //to fixed returns only 2 decimal places.
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function getWalkingTime(distanceKm: string, speedKmh = 4) {
  const totalTimeInHours = Number(distanceKm) / speedKmh;

  const days = Math.floor(totalTimeInHours / 24);
  const hours = Math.floor(totalTimeInHours % 24);
  const minutes = Math.round(
    (totalTimeInHours - Math.floor(totalTimeInHours)) * 60
  );

  let timeString = "";
  if (days > 0) timeString += `${days}d `;
  if (hours > 0) timeString += `${hours}h `;
  if (minutes > 0) timeString += `${minutes}min`;

  return timeString.trim() || "0min"; // Return '0min' if no time is calculated
}
