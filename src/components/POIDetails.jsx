import "../styles/POIDetails.css";

// Official doc for POI tags : https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dtoilets

export default function POIDetails({ point }) {
  return (
    <>
      <hgroup className="poi-details-heading">
        <img
          className="poi-icon"
          loading="lazy"
          src={`/icons/${
            point.tags.amenity === "drinking_water" ? "faucet" : ""
          }${point.tags.amenity === "toilets" ? "toilets" : ""}${
            point.tags.amenity === "restaurant" ? "food" : ""
          }_icon.svg`}
          alt=""
        />
        <h3>{point.tags.amenity.replace("_", " ")}</h3>
      </hgroup>
      {/* (point.tags.amenity === "drinking_water" && userFilters.water) ||
        (point.tags.amenity === "toilets" && userFilters.toilets) ||
        (point.tags.amenity === "restaurant" && userFilters.food) */}
      {/* <p>{JSON.stringify(point.tags)}</p> */}

      <ul className="poi-details">
        {point.tags.wheelchair && (
          <li className="poi-info-row">
            <img
              className="poi-icon"
              loading="lazy"
              src="/icons/wheelchair.svg"
              alt=""
            />
            <p>wheelchair access : {point.tags.wheelchair}</p>
          </li>
        )}

        {point.tags.fee && (
          <li className="poi-info-row">
            <img
              className="poi-icon"
              loading="lazy"
              src="/icons/money.svg"
              alt=""
            />
            <p>
              {point.tags.fee === "no"
                ? "free of charge"
                : "access requires a fee"}
            </p>
          </li>
        )}

        {point.tags["toilets:position"] && (
          <li className="poi-info-row">
            <img
              className="poi-icon"
              loading="lazy"
              src="/icons/toilet.svg"
              alt=""
            />
            <p>
              position : {point.tags["toilets:position"].replaceAll(";", ", ")}
            </p>
          </li>
        )}

        {point.tags.changing_table && (
          <li className="poi-info-row">
            <img
              className="poi-icon"
              loading="lazy"
              src="icons/baby-carriage.svg"
              alt=""
            />
            <p>changing table : {point.tags.changing_table}</p>
          </li>
        )}

        <li className="poi-info-row">
          <img
            className="poi-icon"
            loading="lazy"
            src="icons/footsteps.svg"
            alt=""
          />
          <p>{`distance : ${point.distanceKm} km`}</p>
        </li>

        <li className="poi-info-row">
          <img
            className="poi-icon"
            loading="lazy"
            src="/icons/time.svg"
            alt=""
          />
          <p>{`walk time : ${point.walkTime}`}</p>
        </li>
      </ul>
    </>
  );
}
