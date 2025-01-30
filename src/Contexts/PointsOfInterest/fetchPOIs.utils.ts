import { LatLng, MapBounds, Point, UserFilters } from '../contexts.types';
import {
  distanceAsString,
  getDistanceKm,
  getWalkingTime,
} from '../../utilities/distances.utils';

export async function getPoints(
  userLocation: LatLng,
  userFilters: UserFilters,
  mapBounds: MapBounds,
) {
  if (!mapBounds) return { success: false, POIs: [] };

  const { water, food, toilets } = userFilters;
  const boundingBox = `${mapBounds.minLat},${mapBounds.minLng},${mapBounds.maxLat},${mapBounds.maxLng}`;
  const maxObjects = 2000;

  try {
    // Fetch data from Overpass API
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body:
        'data=' +
        encodeURIComponent(`
        [bbox:${boundingBox}]
        [out:json]
        [timeout:25];
        (
          ${water ? `node["amenity"="drinking_water"](${boundingBox});` : ''}
          ${toilets ? `node["amenity"="toilets"](${boundingBox});` : ''}
          ${food ? `node["amenity"="restaurant"](${boundingBox});` : ''}
        );
        out geom ${maxObjects};
      `),
    });

    if (!response.ok) return { success: false, POIs: [] };

    // Parse the response as JSON
    const result = await response.json();

    const points = result.elements.sort((pointA: Point, pointB: Point) => {
      const distanceA = getDistanceKm(
        userLocation.lat,
        userLocation.lng,
        pointA.lat,
        pointA.lon,
      );
      const distanceB = getDistanceKm(
        userLocation.lat,
        userLocation.lng,
        pointB.lat,
        pointB.lon,
      );

      // Directly mutating the point objects to include distance and walkTime
      pointA.distance = distanceAsString(distanceA);
      pointA.walkTime = getWalkingTime(distanceA);

      pointB.distance = distanceAsString(distanceB);
      pointB.walkTime = getWalkingTime(distanceB);

      // Sorting based on distance
      return Number(distanceA) - Number(distanceB);
    });

    return { success: true, POIs: points };
  } catch {
    return { success: false, POIs: [] };
  }
}
