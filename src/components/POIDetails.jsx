import wheechairIcon from "../assets/icons/wheelchair.svg";
import moneyIcon from "../assets/icons/money.svg";
import footstepsIcon from "../assets/icons/footsteps.svg";
import timeIcon from "../assets/icons/time.svg";
import toiletPositionIcon from "../assets/icons/toilet.svg";
import changingTableIcon from "../assets/icons/baby-carriage.svg"
import "../styles/POIDetails.css";

export default function POIDetails({ point }) {
  return (
    <>
      <h3>
        <span className="icon-walter-black info-logo" aria-hidden="true" />
        {point.tags.amenity.replace("_", " ")}
      </h3>

      {/* <p>{JSON.stringify(point.tags)}</p> */}

      <ul className="poi-details">
        {point.tags.wheelchair && (
          <li className="poi-info-row">
            <img
              className="poi-icon"
              loading="lazy"
              src={wheechairIcon}
              alt=""
            />
            <p>wheelchair access : {point.tags.wheelchair}</p>
          </li>
        )}

        {point.tags.fee && (
          <li className="poi-info-row">
            <img className="poi-icon" loading="lazy" src={moneyIcon} alt="" />
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
              src={toiletPositionIcon}
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
              src={changingTableIcon}
              alt=""
            />
            <p>changing table : {point.tags.changing_table}</p>
          </li>
        )}

        <li className="poi-info-row">
          <img className="poi-icon" loading="lazy" src={footstepsIcon} alt="" />
          <p>{`distance : ${point.distanceKm} km`}</p>
        </li>

        <li className="poi-info-row">
          <img className="poi-icon" loading="lazy" src={timeIcon} alt="" />
          <p>{`walk time : ${Math.round((point.distanceKm * 60) / 4)} mn`}</p>
        </li>
      </ul>
    </>
  );
}
