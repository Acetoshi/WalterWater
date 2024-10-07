import { useEffect, useState, useRef } from "react";
import "../styles/walter.css";
import tips from "../scripts/walterTips.json";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";

function Walter() {
  const checkFirstRender = useRef(true);
  const checkSecondRender = useRef(true);

  const { areaPOIs } = usePOIs();
  console.log(areaPOIs);

  const [walterIsVisible, setWalterIsVisible] = useState(false);
  const [tip, setTip] = useState("");
  const [message, setMessage] = useState("");

  //warn the user when his search didn't find anything
  useEffect(() => {

    if (checkFirstRender.current) {
      checkFirstRender.current = false;
      return;
    } else if (checkSecondRender.current) {
      checkFirstRender.current = false;
      return;
    }

    if (areaPOIs.length === 0) {
      console.log("ouvre-la water");
      setMessage("Nothing here but crickets ! Maybe try another place ?");
      setWalterIsVisible(true);
      setTimeout(() => setWalterIsVisible(false), 3000);
      setTimeout(() => setMessage(""), 4000);
    }
  }, [areaPOIs]);

  // au chargement
  useEffect(() => {
    //affichage bulle infos

    // Déclencher l'animation après le montage du composant
    const firstLoad = localStorage.getItem("firstLoad");
    if (!firstLoad) {
      // First load, show the first element and set the flag in localStorage
      setTip(tips[0].tip);
      localStorage.setItem("firstLoad", "true");
    } else {
      // Subsequent loads, show a random element
      const randomIndex = Math.floor(Math.random() * tips.length);
      setTip(tips[randomIndex].tip);
    }
  }, []);

  return (
    <button
      className={`container-walter ${walterIsVisible ? "" : "hidden"}`}
      onClick={() => setWalterIsVisible(!walterIsVisible)}
    >
      <div className={`infos-walter ${walterIsVisible ? "" : "fade-in"}`}>
        <button
          className="close-walter"
          onClick={() => setWalterIsVisible(false)}
        >
          <span className="icon-close" aria-label="Fermer modal"></span>
        </button>
        <div className="container-infos">
          <p>{message || tip}</p>
        </div>
      </div>
      <span className="icon-walter-color" aria-label="Walter la mascotte">
        <span className="path1"></span>
        <span className="path2"></span>
        <span className="path3"></span>
        <span className="path4"></span>
        <span className="path5"></span>
        <span className="path6"></span>
      </span>
    </button>
  );
}

export default Walter;
