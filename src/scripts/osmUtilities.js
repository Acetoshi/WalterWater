function boundingBox(location, radius) {
  const minLat = location[0] - radius / 2;
  const maxLat = location[0] + radius / 2;
  const minLon = location[1] - radius / 2;
  const maxLon = location[1] + radius / 2;
  return `${minLat},${minLon},${maxLat},${maxLon}`;
}

export async function getPoints(
  location,
  radius,
  setterFunction,
  queryDetails,
) {
  fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    // The body contains the query
    // to understand the query language see "The Programmatic Query Language" on
    // https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
    body:
      "data=" +
      encodeURIComponent(`
        [bbox:${boundingBox(location, radius)}]
        [out:json]
        [timeout:25]
        ;
        (
          node${queryDetails}(${boundingBox(location, radius)});
        );
        out geom;
    `),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      setterFunction(result.elements);
    });
}
