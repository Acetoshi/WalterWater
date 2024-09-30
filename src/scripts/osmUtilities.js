//TODO : this functions can be accessed via map.distance from leaflet.
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

function boundingBox(location, radius) {
  const minLat = location.lat - radius / 2;
  const maxLat = location.lat + radius / 2;
  const minLng = location.lng - radius / 2;
  const maxLng = location.lng + radius / 2;
  return `${minLat},${minLng},${maxLat},${maxLng}`;
}

export async function getAllPoints(location, radius, setterFunction) {
  const bBox = boundingBox(location, radius);
  const maxObjects = 1000;
  fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    // The body contains the query
    // to understand the query language see "The Programmatic Query Language" on
    // https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
    body:
      "data=" +
      encodeURIComponent(`
          [bbox:${bBox}]
          [out:json]
          [timeout:25]
          ;
          (
            node["amenity"="drinking_water"](${bBox});
            node["amenity"="toilets"](${bBox});
            node["amenity"="restaurant"](${bBox});
          );
          out geom ${maxObjects};
      `),
  })
    .then((data) => data.json())
    .then((result) => {
      setterFunction(
        result.elements
          .map((point) => ({
            ...point,
            distanceKm: getDistanceFromLatLonInKm(
              location.lat,
              location.lng,
              point.lat,
              point.lon
            ),
          }))
          .sort((pointA, pointB) =>
            pointA.distanceKm - pointB.distanceKm > 0 ? true : false
          )
      );
    });
}
