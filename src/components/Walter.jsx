import { useEffect, useState } from "react";
import "../styles/walter.css";

function Walter() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayWalterInfos, setDisplayWalterInfos] = useState(false);

  const handleWalterInfos = (e) => {
    setDisplayWalterInfos(true);
  };
  useEffect(() => {
    // Déclencher l'animation après le montage du composant
    setIsVisible(true);
  }, []);
  return (
    <div className={`container-walter fade-in ${isVisible ? "visible" : ""}`}>
      <div className={`infos-walter ${displayWalterInfos ? "fade-in" : ""}`}>
        <button className="close-walter" onClick={handleWalterInfos}>
          <span className="icon-close" aria-label="Fermer modal"></span>
        </button>

        <p>Bienvenue cher(e) explorateur, </p>
        <p>
          Tu trouveras via les boutons ci-dessous de quoi te désalterer durant
          ton incroyable périple !
        </p>
      </div>
      <span className="icon-walter-color" aria-label="Walter la mascotte">
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
