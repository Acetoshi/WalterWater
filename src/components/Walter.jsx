import { useEffect, useState } from "react";
import "../styles/walter.css";
import tips from "../scripts/walterTips.json"

function Walter() {

  // console.log('%c⧭', 'color: #ff0000', adviseHiking[0]);

  const [isVisible, setIsVisible] = useState(false);
  const [displayWalterInfos, setDisplayWalterInfos] = useState(false);

  const [tip, setTip] = useState("");
  // const [randomAdvise, setRandomAdvise] = useState(adviseHiking[0]);

  // toggle bulle Walter
  const handleWalterInfos = () => {
    setDisplayWalterInfos(true);
  };

  // toggle bulle Wal
  const handleWalter = () => {
    setDisplayWalterInfos(false);
  };

  // random number
  function getNumberRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // console.log('%c⧭ getNumberRandom', 'color: #00e600', getNumberRandom(0, adviseHiking.length));

  // au chargement
  useEffect(() => {
    //affichage bulle infos
    setIsVisible(true);

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
    <div
      className={`container-walter ${displayWalterInfos ? "hide-walter" : ""}`}
    >
      <div className={`infos-walter ${displayWalterInfos ? "fade-in" : ""}`}>
        <button className="close-walter" onClick={handleWalterInfos}>
          <span className="icon-close" aria-label="Fermer modal"></span>
        </button>
        <div className="container-infos">
          <p>{tip}</p>
        </div>
      </div>
      <span
        className="icon-walter-color"
        aria-label="Walter la mascotte"
        onClick={handleWalter}
      >
        <span className="path1"></span>
        <span className="path2"></span>
        <span className="path3"></span>
        <span className="path4"></span>
        <span className="path5"></span>
        <span className="path6"></span>
      </span>
    </div>
  );
}

export default Walter;
