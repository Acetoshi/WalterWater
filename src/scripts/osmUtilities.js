export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function boundingBox(location, radius) {
  const minLat = location[0] - radius / 2;
  const maxLat = location[0] + radius / 2;
  const minLon = location[1] - radius / 2;
  const maxLon = location[1] + radius / 2;
  return `${minLat},${minLon},${maxLat},${maxLon}`;
}

export async function getAllPoints(location, radius, setterFunction) {
  const bBox = boundingBox(location, radius);
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
          out geom;
      `),
  })
    .then((data) => data.json())
    .then((result) => {
      setterFunction(result.elements.slice(0, 500));
    });
}