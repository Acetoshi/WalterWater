export function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
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

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getWalkingTime(distanceKm, speedKmh = 4) {
  const totalTimeInHours = distanceKm / speedKmh;

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


//TODO : await the result properly in the context
export async function getPoints(
  userLocation,
  userFilters,
  mapBounds
) {

  if(!mapBounds) return {success:false,POIs:[]}

  const { water, food, toilets } = userFilters;
  const boundingBox = `${mapBounds.minLat},${mapBounds.minLng},${mapBounds.maxLat},${mapBounds.maxLng}`;
  const maxObjects = 2000;

  try {
    // Fetch data from Overpass API
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body:
        "data=" +
        encodeURIComponent(`
        [bbox:${boundingBox}]
        [out:json]
        [timeout:25];
        (
          ${water ? `node["amenity"="drinking_water"](${boundingBox});` : ""}
          ${toilets ? `node["amenity"="toilets"](${boundingBox});` : ""}
          ${food ? `node["amenity"="restaurant"](${boundingBox});` : ""}
        );
        out geom ${maxObjects};
      `),
    });

    if (!response.ok) return { success: false, POIs: [] };

    // Parse the response as JSON
    const result = await response.json();

    console.log(result)

    const points = result.elements
      .map((point) => {
        const distance = getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lng,
          point.lat,
          point.lon
        );
        return {
          ...point,
          distanceKm: distance,
          walkTime: getWalkingTime(distance), // Pass userSpeed if needed
        };
      })
      .sort((pointA, pointB) => pointA.distanceKm - pointB.distanceKm);

    return { success: true, POIs: points };
  } catch {
    return { success: false, POIs: [] }
  }
}

//TODO : improve with : 
// Sort and compute distance and walkTime in one loop
// points.sort((pointA, pointB) => {
//   const distanceA = getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, pointA.lat, pointA.lon);
//   const distanceB = getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, pointB.lat, pointB.lon);

//   // Directly mutating the point objects to include distance and walkTime
//   pointA.distanceKm = distanceA;
//   pointA.walkTime = getWalkingTime(distanceA);

//   pointB.distanceKm = distanceB;
//   pointB.walkTime = getWalkingTime(distanceB);

//   // Sorting based on distance
//   return distanceA - distanceB;
// });
