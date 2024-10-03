import { Marker, Popup } from "react-leaflet";
import { usePosition } from "../Contexts/PositionProvider";
import { faucetIcon, toiletIcon, foodIcon } from "../scripts/icons";

export default function Markers({ typeOfAmenity }) {
  const { nearbyPOIs, areaPOIs } = usePosition();

  let points = [];
  let icon = {};

  const POIs = nearbyPOIs.concat(areaPOIs);

  if (typeOfAmenity === "water") {
    points = POIs.filter((point) => point.tags.amenity === "drinking_water");
    icon = faucetIcon;
  } else if (typeOfAmenity === "toilets") {
    points = POIs.filter((point) => point.tags.amenity === "toilets");
    icon = toiletIcon;
  } else if (typeOfAmenity === "food") {
    points = POIs.filter((point) => point.tags.amenity === "restaurant");
    icon = foodIcon;
  }

  return (
    <ul>
      {points &&
        points.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lon]} icon={icon}>
            {/* // TODO : faire un composant à partir du popup pour mettre les
            données des toilettes en forme. */}
            <Popup>
              <h3>
                <span
                  className="icon-walter-black info-logo"
                  aria-hidden="true"
                />
                {point.tags.amenity.replace("_", " ")}
              </h3>

              {/* {`${JSON.stringify(point.tags)}`} */}

              {point.tags.wikimedia_commons && (
                <img
                  src={point.tags.wikimedia_commons}
                  alt="wikimediacommons"
                ></img>
              )}
              {point.tags.wheelchair && (
                <p>wheelchair access : {point.tags.wheelchair}</p>
              )}
              {point.tags.fee && (
                <p>
                  {point.tags.fee === "no"
                    ? "free of charge"
                    : "access requires a fee"}
                </p>
              )}
              <p>
                <span
                  className="icon-emplacement info-logo"
                  aria-hidden="true"
                />
                {`Distance : ${point.distanceKm} km`}
              </p>
              <p>
                <span className="icon-time info-logo" aria-hidden="true" />
                {`walk time : ${Math.round(
                  (point.distanceKm * 60) / 4
                )} mn`}
              </p>
            </Popup>
          </Marker>
        ))}
    </ul>
  );
}
